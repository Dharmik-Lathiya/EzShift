#!/usr/bin/env bash
# Starts the Vite frontend with VITE_BACKEND_URL pointed at this machine's LAN IP,
# so a phone/tablet on the same Wi-Fi can reach the local backend (port 3000).
# Express already listens on 0.0.0.0, so the backend is reachable from the LAN.
set -e

# Detect primary LAN IPv4 (skip loopback / docker bridges)
LAN_IP=$(ip -4 addr show 2>/dev/null | grep -oP 'inet \K[\d.]+' | grep -v '^127\.' | head -1)
if [ -z "$LAN_IP" ]; then
  LAN_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
fi
if [ -z "$LAN_IP" ]; then
  echo "[dev:phone] Could not detect a LAN IP, falling back to localhost" >&2
  LAN_IP="localhost"
fi

BACKEND_URL="http://${LAN_IP}:3000"
echo "[dev:phone] Frontend will call the backend at: ${BACKEND_URL}"
echo "[dev:phone] Open the app on your phone at:      http://${LAN_IP}:5173"
export VITE_BACKEND_URL="${BACKEND_URL}"

exec pnpm --dir Frontend run dev