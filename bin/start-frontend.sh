#!/bin/sh
set -eu

PORT="${APP_PORT:-3000}"

exec npm run preview -- --host 0.0.0.0 --port "${PORT}"
