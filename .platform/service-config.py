#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import shlex
import sys
from pathlib import Path


APP_RUNTIMES = {"node", "python", "go", "static"}
MANAGED_RUNTIMES = {"postgres", "redis", "meilisearch"}
ALLOWED_RUNTIMES = APP_RUNTIMES | MANAGED_RUNTIMES


def strip_comments(line: str) -> str:
    in_single = False
    in_double = False
    escaped = False
    out: list[str] = []
    for ch in line:
        if escaped:
            out.append(ch)
            escaped = False
            continue
        if ch == "\\":
            out.append(ch)
            escaped = True
            continue
        if ch == "'" and not in_double:
            in_single = not in_single
            out.append(ch)
            continue
        if ch == '"' and not in_single:
            in_double = not in_double
            out.append(ch)
            continue
        if ch == "#" and not in_single and not in_double:
            break
        out.append(ch)
    return "".join(out).rstrip()


def split_key_value(text: str) -> tuple[str, str]:
    if ":" not in text:
        raise ValueError(f"invalid line: {text}")
    key, value = text.split(":", 1)
    return key.strip(), value.strip()


def parse_scalar(value: str):
    if not value:
        return ""
    if value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    lowered = value.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False
    return value


def slugify(value: str) -> str:
    chars: list[str] = []
    previous_dash = False
    for ch in value.strip().lower():
        if ch.isalnum():
            chars.append(ch)
            previous_dash = False
            continue
        if not previous_dash:
            chars.append("-")
            previous_dash = True
    slug = "".join(chars).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug


def yaml_quote(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def shell_quote(value: str) -> str:
    return shlex.quote(value)


def parse_config(path: Path) -> tuple[str, object]:
    services: list[dict] = []
    legacy: dict[str, object] = {}
    in_services = False
    current_service: dict[str, object] | None = None

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = strip_comments(raw_line)
        if not line.strip():
            continue

        indent = len(line) - len(line.lstrip(" "))
        stripped = line.strip()

        if indent == 0 and stripped == "services:":
            in_services = True
            current_service = None
            continue

        if in_services:
            if indent == 0:
                in_services = False
                current_service = None
            else:
                if stripped.startswith("- "):
                    current_service = {}
                    services.append(current_service)
                    rest = stripped[2:].strip()
                    if rest:
                        key, value = split_key_value(rest)
                        current_service[key] = parse_scalar(value)
                    continue
                if stripped == "-":
                    current_service = {}
                    services.append(current_service)
                    continue
                if current_service is None:
                    raise ValueError("service entry is missing list marker '-'")
                key, value = split_key_value(stripped)
                current_service[key] = parse_scalar(value)
                continue

        key, value = split_key_value(stripped)
        legacy[key] = parse_scalar(value)

    if services:
        return "services", validate_services_config(services)

    return "legacy", validate_legacy_config(legacy)


def parse_expose(value: object, default: bool) -> bool:
    if value in {"", None}:
        return default
    if isinstance(value, bool):
        return value
    lowered = str(value).strip().lower()
    if lowered in {"true", "yes", "1"}:
        return True
    if lowered in {"false", "no", "0"}:
        return False
    raise ValueError(f"invalid expose value: {value}")


def validate_port(value: str, label: str) -> str:
    if not value.isdigit():
        raise ValueError(f"{label}: port must be numeric")
    port_number = int(value)
    if port_number < 1 or port_number > 65535:
        raise ValueError(f"{label}: port out of range")
    return str(port_number)


def validate_name(value: str, label: str) -> str:
    name = slugify(value)
    if len(name) < 2 or len(name) > 63:
        raise ValueError(f"{label}: invalid service name: {name}")
    return name


def validate_services_config(raw_services: list[dict]) -> list[dict]:
    validated: list[dict] = []
    seen_names: set[str] = set()
    managed_counts = {runtime: 0 for runtime in MANAGED_RUNTIMES}

    for index, service in enumerate(raw_services, start=1):
        raw_name = str(service.get("name", "")).strip()
        runtime = str(service.get("runtime", "")).strip()
        port = str(service.get("port", "")).strip()
        start = str(service.get("start", "")).strip()

        if not raw_name:
            raise ValueError(f"service #{index}: name is required")
        name = validate_name(raw_name, f"service #{index}")
        if name in seen_names:
            raise ValueError(f"duplicate service name: {name}")
        seen_names.add(name)

        if runtime not in ALLOWED_RUNTIMES:
            raise ValueError(f"service {name}: unsupported runtime: {runtime}")
        port = validate_port(port, f"service {name}")

        if runtime in APP_RUNTIMES:
            if not start:
                raise ValueError(f"service {name}: start is required")
            if any(ord(ch) < 32 for ch in start):
                raise ValueError(f"service {name}: start contains control characters")
            expose = parse_expose(service.get("expose", False), False)
        else:
            if start:
                raise ValueError(f"service {name}: managed runtime does not allow start")
            expose = parse_expose(service.get("expose", False), False)
            if expose:
                raise ValueError(f"service {name}: managed runtime cannot be exposed")
            managed_counts[runtime] += 1
            if managed_counts[runtime] > 1:
                raise ValueError(f"only one managed {runtime} service is supported")

        validated.append(
            {
                "name": name,
                "port": port,
                "runtime": runtime,
                "start": start,
                "expose": expose,
            }
        )

    if not validated:
        raise ValueError("at least one service is required")

    if not any(service["runtime"] in APP_RUNTIMES for service in validated):
        raise ValueError("at least one app service is required")

    return validated


def validate_legacy_config(raw: dict[str, object]) -> dict[str, str]:
    service_name = validate_name(str(raw.get("name", "")).strip(), "legacy config")
    runtime = str(raw.get("runtime", "")).strip()
    start = str(raw.get("start", "")).strip()
    if runtime not in APP_RUNTIMES:
        raise ValueError(f"legacy config: unsupported runtime: {runtime}")
    if not start:
        raise ValueError("legacy config: start is required")
    if any(ord(ch) < 32 for ch in start):
        raise ValueError("legacy config: start contains control characters")

    legacy_fields = {
        "service_name": service_name,
        "runtime": runtime,
        "start": start,
        "public_service": str(raw.get("public_service", "")).strip() or "",
        "frontend_port": str(raw.get("frontend_port", "")).strip() or "",
        "backend_port": str(raw.get("backend_port", "")).strip() or "",
        "postgres_port": str(raw.get("postgres_port", "")).strip() or "",
        "redis_port": str(raw.get("redis_port", "")).strip() or "",
        "meilisearch_port": str(raw.get("meilisearch_port", "")).strip() or "",
        "public_port": str(raw.get("public_port", "")).strip() or str(raw.get("port", "")).strip() or "",
        "internal_ports": str(raw.get("internal_ports", "")).strip() or "",
    }

    modern_legacy = any(
        legacy_fields[key]
        for key in ("public_service", "frontend_port", "backend_port", "postgres_port", "redis_port", "meilisearch_port")
    )
    if modern_legacy:
        public_service = legacy_fields["public_service"] or "frontend"
        if public_service not in {"frontend", "backend"}:
            raise ValueError("legacy config: public_service must be frontend or backend")
        legacy_fields["public_service"] = public_service
        for key in ("frontend_port", "backend_port", "postgres_port", "redis_port", "meilisearch_port"):
            if legacy_fields[key]:
                legacy_fields[key] = validate_port(legacy_fields[key], f"legacy config {key}")
        if public_service == "frontend":
            if not legacy_fields["frontend_port"]:
                raise ValueError("legacy config: frontend_port is required when public_service=frontend")
            legacy_fields["app_port"] = legacy_fields["frontend_port"]
        else:
            if not legacy_fields["backend_port"]:
                raise ValueError("legacy config: backend_port is required when public_service=backend")
            legacy_fields["app_port"] = legacy_fields["backend_port"]
        internal_ports = [
            port
            for key, port in (
                ("frontend_port", legacy_fields["frontend_port"]),
                ("backend_port", legacy_fields["backend_port"]),
                ("postgres_port", legacy_fields["postgres_port"]),
                ("redis_port", legacy_fields["redis_port"]),
                ("meilisearch_port", legacy_fields["meilisearch_port"]),
            )
            if port and port != legacy_fields["app_port"]
        ]
        legacy_fields["internal_ports_list"] = internal_ports
    else:
        app_port = legacy_fields["public_port"]
        if not app_port:
            raise ValueError("legacy config: public_port or port is required")
        app_port = validate_port(app_port, "legacy config public port")
        internal_ports_list = []
        if legacy_fields["internal_ports"]:
            for item in legacy_fields["internal_ports"].replace(",", " ").split():
                internal_ports_list.append(validate_port(item, "legacy config internal port"))
        legacy_fields["app_port"] = app_port
        legacy_fields["internal_ports_list"] = [port for port in internal_ports_list if port != app_port]

    if legacy_fields["app_port"] in legacy_fields["internal_ports_list"]:
        raise ValueError(f"legacy config: internal port duplicates public port: {legacy_fields['app_port']}")

    return legacy_fields


def emit_env(mode: str, config: object) -> None:
    if mode == "services":
        services = config
        primary = next((item for item in services if item["expose"]), None)
        if primary is None:
            primary = next(item for item in services if item["runtime"] in APP_RUNTIMES)
        print(f"PRIMARY_SERVICE_NAME={shell_quote(primary['name'])}")
        print(f"PRIMARY_APP_PORT={shell_quote(primary['port'])}")
        print(f"PRIMARY_START_COMMAND={shell_quote(primary['start'])}")
        print(f"PRIMARY_RUNTIME={shell_quote(primary['runtime'])}")
        print(f"SERVICE_COUNT={len(services)}")
        print(f"EXPOSED_SERVICE_COUNT={sum(1 for item in services if item['expose'])}")
        return

    legacy = config
    primary_name = legacy["public_service"] or "app"
    print(f"PRIMARY_SERVICE_NAME={shell_quote(primary_name)}")
    print(f"PRIMARY_APP_PORT={shell_quote(legacy['app_port'])}")
    print(f"PRIMARY_START_COMMAND={shell_quote(legacy['start'])}")
    print(f"PRIMARY_RUNTIME={shell_quote(legacy['runtime'])}")
    infra_count = sum(1 for key in ("postgres_port", "redis_port", "meilisearch_port") if legacy[key])
    print(f"SERVICE_COUNT={1 + infra_count}")
    print("EXPOSED_SERVICE_COUNT=1")


def emit_tsv(mode: str, config: object, exposed_only: bool) -> None:
    if mode == "services":
        services = config
        for service in services:
            if exposed_only and not service["expose"]:
                continue
            print(
                "\t".join(
                    [
                        service["name"],
                        service["port"],
                        service["runtime"],
                        service["start"],
                        "true" if service["expose"] else "false",
                    ]
                )
            )
        return

    legacy = config
    if exposed_only:
        print(
            "\t".join(
                [
                    legacy["public_service"] or "app",
                    legacy["app_port"],
                    legacy["runtime"],
                    legacy["start"],
                    "true",
                ]
            )
        )
        return

    print("\t".join(["app", legacy["app_port"], legacy["runtime"], legacy["start"], "true"]))
    for runtime_key, service_name in (
        ("postgres_port", "postgres"),
        ("redis_port", "redis"),
        ("meilisearch_port", "meilisearch"),
    ):
        port = legacy[runtime_key]
        if port:
            print("\t".join([service_name, port, service_name, "", "false"]))


def app_security_lines() -> list[str]:
    return [
        "    read_only: true",
        "    security_opt:",
        '      - "no-new-privileges:true"',
        "    cap_drop:",
        '      - "ALL"',
        "    pids_limit: 256",
        '    mem_limit: "512m"',
        '    cpus: "1.00"',
        "    tmpfs:",
        '      - "/tmp:size=64m"',
        '      - "/run:size=16m"',
    ]


def redis_security_lines() -> list[str]:
    return [
        "    pids_limit: 256",
        '    mem_limit: "256m"',
        '    cpus: "0.50"',
        "    tmpfs:",
        '      - "/data:size=64m"',
        '      - "/tmp:size=32m"',
    ]


def meili_security_lines() -> list[str]:
    return [
        "    security_opt:",
        '      - "no-new-privileges:true"',
        "    cap_drop:",
        '      - "ALL"',
        "    pids_limit: 256",
        '    mem_limit: "512m"',
        '    cpus: "0.75"',
        "    tmpfs:",
        '      - "/tmp:size=64m"',
    ]


def render_app_service(
    name: str,
    port: str,
    runtime: str,
    start: str,
    expose: bool,
    allocations: dict[str, str],
    deploy_user: str,
    project_slug: str,
    image: str,
    dependencies: list[tuple[str, str]],
    postgres_service: dict | None,
    redis_service: dict | None,
    meili_service: dict | None,
) -> list[str]:
    lines = [
        f"  {name}:",
        f"    image: {yaml_quote(image)}",
        f"    container_name: {yaml_quote(f'{deploy_user}-{project_slug}-{name}')}",
        '    restart: "always"',
        f"    command: {yaml_quote(f'/bin/sh -lc \"{start}\"')}",
        "    environment:",
        f"      APP_PORT: {yaml_quote(port)}",
        f"      SERVICE_NAME: {yaml_quote(name)}",
        f"      PROJECT_NAME: {yaml_quote(project_slug)}",
        f"      PROJECT_PATH: {yaml_quote(f'{deploy_user}/{project_slug}')}",
    ]

    if postgres_service is not None:
        db_name = os.environ.get("PLATFORM_POSTGRES_DB", project_slug)
        db_user = os.environ.get("PLATFORM_POSTGRES_USER", project_slug)
        db_password = os.environ.get("PLATFORM_POSTGRES_PASSWORD", "")
        lines.extend(
            [
                f"      POSTGRES_HOST: {yaml_quote(postgres_service['name'])}",
                f"      POSTGRES_PORT: {yaml_quote(postgres_service['port'])}",
                f"      POSTGRES_DB: {yaml_quote(db_name)}",
                f"      POSTGRES_USER: {yaml_quote(db_user)}",
                f"      POSTGRES_PASSWORD: {yaml_quote(db_password)}",
                f"      DATABASE_URL: {yaml_quote(f'postgresql+asyncpg://{db_user}:{db_password}@{postgres_service['name']}:{postgres_service['port']}/{db_name}')}",
            ]
        )

    if redis_service is not None:
        lines.extend(
            [
                f"      REDIS_HOST: {yaml_quote(redis_service['name'])}",
                f"      REDIS_PORT: {yaml_quote(redis_service['port'])}",
                f"      REDIS_URL: {yaml_quote(f'redis://{redis_service['name']}:{redis_service['port']}')}",
            ]
        )

    if meili_service is not None:
        meili_master_key = os.environ.get("PLATFORM_MEILI_MASTER_KEY", "")
        lines.extend(
            [
                f"      MEILI_HOST: {yaml_quote(meili_service['name'])}",
                f"      MEILI_PORT: {yaml_quote(meili_service['port'])}",
                f"      MEILI_URL: {yaml_quote(f'http://{meili_service['name']}:{meili_service['port']}')}",
                f"      MEILI_MASTER_KEY: {yaml_quote(meili_master_key)}",
            ]
        )

    if expose:
        host_port = allocations.get(name, "")
        if not host_port:
            raise ValueError(f"missing host port allocation for exposed service: {name}")
        lines.extend(["    ports:", f"      - {yaml_quote(f'{host_port}:{port}')}"])

    internal_expose_ports = []
    for dependency in (postgres_service, redis_service, meili_service):
        if dependency is not None:
            internal_expose_ports.append(dependency["port"])
    if internal_expose_ports:
        lines.append("    expose:")
        for internal_port in internal_expose_ports:
            lines.append(f"      - {yaml_quote(internal_port)}")

    if dependencies:
        lines.append("    depends_on:")
        for dependency_name, condition in dependencies:
            lines.append(f"      {dependency_name}:")
            lines.append(f"        condition: {condition}")

    lines.extend(app_security_lines())
    lines.extend(["    networks:", '      - "app"'])
    return lines


def render_postgres_service(service: dict, deploy_user: str, project_slug: str) -> list[str]:
    db_name = os.environ.get("PLATFORM_POSTGRES_DB", project_slug)
    db_user = os.environ.get("PLATFORM_POSTGRES_USER", project_slug)
    db_password = os.environ.get("PLATFORM_POSTGRES_PASSWORD", "")
    volume_name = f"{deploy_user}-{project_slug}-{service['name']}-data"
    return [
        f"  {service['name']}:",
        '    image: "postgres:15-alpine"',
        '    restart: "always"',
        "    environment:",
        f"      POSTGRES_DB: {yaml_quote(db_name)}",
        f"      POSTGRES_USER: {yaml_quote(db_user)}",
        f"      POSTGRES_PASSWORD: {yaml_quote(db_password)}",
        "    expose:",
        f"      - {yaml_quote(service['port'])}",
        "    volumes:",
        f"      - {yaml_quote(f'{volume_name}:/var/lib/postgresql/data')}",
        "    healthcheck:",
        f"      test: {yaml_quote(f'pg_isready -U {db_user} -d {db_name}')}",
        '      interval: "5s"',
        '      timeout: "5s"',
        '      retries: 10',
        "    networks:",
        '      - "app"',
    ]


def render_redis_service(service: dict) -> list[str]:
    lines = [
        f"  {service['name']}:",
        '    image: "redis:7-alpine"',
        '    restart: "always"',
        '    command: ["redis-server", "--save", "", "--appendonly", "no", "--maxmemory", "256mb", "--maxmemory-policy", "allkeys-lru"]',
        "    expose:",
        f"      - {yaml_quote(service['port'])}",
    ]
    lines.extend(redis_security_lines())
    lines.extend(["    networks:", '      - "app"'])
    return lines


def render_meili_service(service: dict, deploy_user: str, project_slug: str) -> list[str]:
    meili_master_key = os.environ.get("PLATFORM_MEILI_MASTER_KEY", "")
    volume_name = f"{deploy_user}-{project_slug}-{service['name']}-data"
    lines = [
        f"  {service['name']}:",
        '    image: "getmeili/meilisearch:v1.12"',
        '    restart: "always"',
        "    environment:",
        f"      MEILI_MASTER_KEY: {yaml_quote(meili_master_key)}",
        "    expose:",
        f"      - {yaml_quote(service['port'])}",
        "    volumes:",
        f"      - {yaml_quote(f'{volume_name}:/meili_data')}",
    ]
    lines.extend(meili_security_lines())
    lines.extend(["    networks:", '      - "app"'])
    return lines


def emit_services_compose(
    services: list[dict], allocations: dict[str, str], deploy_user: str, project_slug: str, image: str
) -> None:
    postgres_service = next((service for service in services if service["runtime"] == "postgres"), None)
    redis_service = next((service for service in services if service["runtime"] == "redis"), None)
    meili_service = next((service for service in services if service["runtime"] == "meilisearch"), None)

    print("services:")
    for service in services:
        if service["runtime"] == "postgres":
            for line in render_postgres_service(service, deploy_user, project_slug):
                print(line)
            continue
        if service["runtime"] == "redis":
            for line in render_redis_service(service):
                print(line)
            continue
        if service["runtime"] == "meilisearch":
            for line in render_meili_service(service, deploy_user, project_slug):
                print(line)
            continue

        dependencies: list[tuple[str, str]] = []
        if postgres_service is not None:
            dependencies.append((postgres_service["name"], "service_healthy"))
        if redis_service is not None:
            dependencies.append((redis_service["name"], "service_started"))
        if meili_service is not None:
            dependencies.append((meili_service["name"], "service_started"))

        for line in render_app_service(
            service["name"],
            service["port"],
            service["runtime"],
            service["start"],
            service["expose"],
            allocations,
            deploy_user,
            project_slug,
            image,
            dependencies,
            postgres_service,
            redis_service,
            meili_service,
        ):
            print(line)

    print("")
    print("networks:")
    print("  app:")
    print(f"    name: {yaml_quote(f'{deploy_user}-{project_slug}-net')}")

    managed_services = [service for service in services if service["runtime"] in {"postgres", "meilisearch"}]
    if managed_services:
        print("")
        print("volumes:")
        for service in managed_services:
            volume_name = f"{deploy_user}-{project_slug}-{service['name']}-data"
            print(f"  {volume_name}:")
            print(f"    name: {yaml_quote(volume_name)}")


def emit_legacy_compose(
    legacy: dict[str, str], allocations: dict[str, str], deploy_user: str, project_slug: str, image: str
) -> None:
    public_name = legacy["public_service"] or "app"
    host_port = allocations.get(public_name, "")
    if not host_port:
        raise ValueError(f"missing host port allocation for exposed legacy service: {public_name}")

    dependencies: list[tuple[str, str]] = []
    postgres_service = None
    redis_service = None
    meili_service = None
    if legacy["postgres_port"]:
        postgres_service = {"name": "postgres", "port": legacy["postgres_port"]}
        dependencies.append(("postgres", "service_healthy"))
    if legacy["redis_port"]:
        redis_service = {"name": "redis", "port": legacy["redis_port"]}
        dependencies.append(("redis", "service_started"))
    if legacy["meilisearch_port"]:
        meili_service = {"name": "meilisearch", "port": legacy["meilisearch_port"]}
        dependencies.append(("meilisearch", "service_started"))

    print("services:")
    for line in render_app_service(
        "app",
        legacy["app_port"],
        legacy["runtime"],
        legacy["start"],
        True,
        {public_name: host_port, "app": host_port},
        deploy_user,
        project_slug,
        image,
        dependencies,
        postgres_service,
        redis_service,
        meili_service,
    ):
        if line == "    environment:":
            print(line)
            print(f"      PUBLIC_SERVICE: {yaml_quote(legacy['public_service'])}")
            print(f"      FRONTEND_PORT: {yaml_quote(legacy['frontend_port'])}")
            print(f"      BACKEND_PORT: {yaml_quote(legacy['backend_port'])}")
            continue
        print(line)

    if postgres_service is not None:
        for line in render_postgres_service(postgres_service, deploy_user, project_slug):
            print(line)
    if redis_service is not None:
        for line in render_redis_service(redis_service):
            print(line)
    if meili_service is not None:
        for line in render_meili_service(meili_service, deploy_user, project_slug):
            print(line)

    print("")
    print("networks:")
    print("  app:")
    print(f"    name: {yaml_quote(f'{deploy_user}-{project_slug}-net')}")

    managed_services = [service for service in (postgres_service, meili_service) if service is not None]
    if managed_services:
        print("")
        print("volumes:")
        for service in managed_services:
            volume_name = f"{deploy_user}-{project_slug}-{service['name']}-data"
            print(f"  {volume_name}:")
            print(f"    name: {yaml_quote(volume_name)}")


def load_allocations(path: Path) -> dict[str, str]:
    allocations: dict[str, str] = {}
    if not path.exists():
        return allocations
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line:
            continue
        name, host_port = line.split("\t", 1)
        allocations[name] = host_port
    return allocations


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["env", "tsv", "render-compose"])
    parser.add_argument("config")
    parser.add_argument("--exposed-only", action="store_true")
    parser.add_argument("--allocations")
    parser.add_argument("--deploy-user")
    parser.add_argument("--project-slug")
    parser.add_argument("--image")
    args = parser.parse_args()

    try:
        mode, config = parse_config(Path(args.config))
        if args.command == "env":
            emit_env(mode, config)
            return 0
        if args.command == "tsv":
            emit_tsv(mode, config, args.exposed_only)
            return 0
        if not args.allocations or not args.deploy_user or not args.project_slug or not args.image:
            raise ValueError("render-compose requires --allocations, --deploy-user, --project-slug, and --image")
        allocations = load_allocations(Path(args.allocations))
        if mode == "services":
            emit_services_compose(config, allocations, args.deploy_user, args.project_slug, args.image)
        else:
            emit_legacy_compose(config, allocations, args.deploy_user, args.project_slug, args.image)
        return 0
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
