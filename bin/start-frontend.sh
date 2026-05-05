#!/bin/sh
set -eu

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${APP_PORT:-${PORT:-3000}}"

exec node /app/bin/server.mjs
