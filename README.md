# SCAICT 115 Summer Camp

Vite + React landing site for SCAICT 115 summer camp.

## Local Development

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 3000
```

## Serelix GitLab CI / Deployment

This repository is configured for the Serelix GitLab platform. The platform owns the CI deploy flow in `.gitlab-ci.yml`; this project provides the app image through `Dockerfile` and declares runnable services in `service.config.yml`.

Current service:

- `frontend`: Vite preview server on internal port `3000`, exposed by the platform.

The production container starts with:

```bash
sh /app/bin/start-frontend.sh
```

The script maps the platform-provided `APP_PORT` to Vite preview's `--port`, so the app follows the host-managed port assignment.
