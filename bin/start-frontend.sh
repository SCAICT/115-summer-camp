#!/bin/sh
set -eu

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${APP_PORT:-${PORT:-3000}}"

exec node /app/node_modules/vite/bin/vite.js preview --host "${HOSTNAME}" --port "${PORT}" --strictPort
