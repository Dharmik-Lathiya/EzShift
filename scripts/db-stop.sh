#!/usr/bin/env bash
# Stops the dev database (docker container or local pg_ctl cluster).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PG_DIR="$ROOT/.pgdata"
MODE="${1:-stop}"

if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  cd "$ROOT"
  docker compose "$MODE"
elif [ -f "$PG_DIR/PG_VERSION" ]; then
  pg_ctl -D "$PG_DIR" stop -m fast || echo "local cluster already stopped"
else
  echo "No database running (Docker down and no local cluster)."
fi