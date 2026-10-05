// src/utils/backendWarmup.js
//
// Render's free instance "spins down" after inactivity, so the first API call
// after idle (login, dashboard fetch, etc.) can hang for 30-60s while it
// cold-starts — which reads as "stuck on the login screen".
//
// We ping a cheap /health endpoint as soon as the app loads (and again when
// entering a dashboard) so the instance is already warm by the time a real
// request is made. The ping never blocks the UI.

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let warmupStarted = false;

async function ping(timeoutMs = 10000) {
  if (!BACKEND_URL) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BACKEND_URL}/health`, {
      signal: controller.signal,
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fire-and-forget backend warm-up. Runs at most once per page load (later
 * calls are no-ops), retrying until the backend responds or maxAttempts is
 * reached.
 */
export function warmUpBackend({ maxAttempts = 6, retryDelayMs = 5000 } = {}) {
  if (warmupStarted) return;
  warmupStarted = true;

  (async () => {
    for (let i = 0; i < maxAttempts; i++) {
      if (await ping()) return;
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  })();
}