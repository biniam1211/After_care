// Best-effort caseworker notification. Never throws — the UI has already shown
// an optimistic "sent"; this just fires the real email when the server is
// configured (RESEND_API_KEY + a recipient). Returns true only on a real send.
export async function sendCaseworker({ to, message, subject }) {
  try {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ to: to || "", message, subject }),
    });
    if (!res.ok) return false;
    const j = await res.json();
    return !!(j && j.sent);
  } catch (e) {
    return false;
  }
}
