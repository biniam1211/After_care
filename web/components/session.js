// Client helpers for optional server-side sync + magic-link auth.
// Every function fails safe: if the backend isn't configured or errors,
// the app just keeps using localStorage.

export async function fetchAccount() {
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return { configured: false, user: null };
    const j = await res.json();
    return { configured: !!j.configured, user: j.user || null };
  } catch {
    return { configured: false, user: null };
  }
}

// Returns { authenticated, email?, state? } or null on any failure.
export async function fetchServerState() {
  try {
    const res = await fetch("/api/state");
    if (!res.ok) return null;
    const j = await res.json();
    if (!j.configured) return null;
    return { authenticated: !!j.authenticated, email: j.email, state: j.state || null };
  } catch {
    return null;
  }
}

export async function saveServerState(state) {
  try {
    await fetch("/api/state", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(state),
    });
  } catch {
    /* ignore — localStorage is the source of truth when offline */
  }
}

// Ask the server to email a sign-in link. Returns { configured, sent, devLink? }.
export async function requestSignInLink(email) {
  try {
    const res = await fetch("/api/auth/request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch {
    return { configured: false, sent: false };
  }
}

export async function signOutServer() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    /* ignore */
  }
}
