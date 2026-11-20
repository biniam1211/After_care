// Best-effort caseworker notification. Never throws — the UI has already shown
// an optimistic "sent"; this just fires the real email when the server is
// configured (signed-in session + caseworker email on file + RESEND_API_KEY).
// The `to` field is ignored by the server (recipient is looked up server-side);
// it is kept in the client API for call-site clarity only.
export async function sendCaseworker({ to, message, subject }) {
  try {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, subject, to: to || "" }),
    });
    if (!res.ok) return false;
    const j = await res.json();
    return !!(j && j.sent);
  } catch (e) {
    return false;
  }
}
