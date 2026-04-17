#!/bin/sh
set -eu

CONFIG_FILE="${1:-service.config.yml}"
[ -f "$CONFIG_FILE" ] || {
  echo "service config not found: $CONFIG_FILE" >&2
  exit 1
}

python3 "$(dirname "$0")/service-config.py" env "$CONFIG_FILE"
