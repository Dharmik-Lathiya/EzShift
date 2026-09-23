#!/usr/bin/env bash
# Starts the dev database.
# 1) Prefers Docker (docker-compose.yml) when the Docker daemon is running.
# 2) Falls back to a local Postgres cluster managed by pg_ctl (no sudo needed).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PG_DIR="$ROOT/.pgdata"
PG_LOG="$PG_DIR/postgres.log"

export PGPORT="${POSTGRES_PORT:-5432}"
export PGUSER="${POSTGRES_USER:-ezshift}"
export PGDATABASE="${POSTGRES_DB:-ezshift}"

# 1) Preferred: Docker daemon running
if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  cd "$ROOT"
  docker compose up -d postgres
  exec docker compose logs -f postgres --tail 0
fi

# 2) Fallback: local Postgres managed by pg_ctl
if ! command -v pg_ctl >/dev/null 2>&1; then
  echo "[db] ERROR: Docker daemon is not running and pg_ctl is not installed."
  echo "[db]        Either start Docker:  sudo systemctl start docker"
  echo "[db]        or install postgres locally."
  exit 1
fi

if [ ! -f "$PG_DIR/PG_VERSION" ]; then
  echo "[db] Docker not available - initializing local Postgres cluster at $PG_DIR ..."
  mkdir -p "$PG_DIR"
  initdb -D "$PG_DIR" -U "$PGUSER" --auth=trust -E UTF8 >/dev/null
  echo "port = $PGPORT" >> "$PG_DIR/postgresql.conf"
fi

if ! pg_ctl -D "$PG_DIR" status >/dev/null 2>&1; then
  echo "[db] Starting local Postgres (port $PGPORT) ..."
  pg_ctl -D "$PG_DIR" -l "$PG_LOG" -o "-p $PGPORT -k $PG_DIR" start >/dev/null
fi

createdb -h localhost -p "$PGPORT" -U "$PGUSER" "$PGDATABASE" 2>/dev/null || true

if ! pg_isready -h localhost -p "$PGPORT" -U "$PGUSER" >/dev/null 2>&1; then
  echo "[db] ERROR: Postgres not accepting connections on port $PGPORT"
  exit 1
fi
echo "[db] Local Postgres ready: db=$PGDATABASE user=$PGUSER port=$PGPORT"
exec tail -f "$PG_LOG"