"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | ok | error
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setState("error");
      setMsg("Please enter a valid email.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setState("ok");
      setMsg("You’re on the list — thank you! 💙");
      setEmail("");
    } catch {
      setState("error");
      setMsg("Hmm, that didn’t go through. Try again, or email hello@aftercare.app.");
    }
  }

  if (state === "ok") {
    return <p style={{ color: "var(--green-press)", fontWeight: 700 }}>{msg}</p>;
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="nl-email" style={{ position: "absolute", left: -9999 }}>Email address</label>
      <input
        id="nl-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary" disabled={state === "loading"}>
        {state === "loading" ? "Joining…" : "Keep me posted"}
      </button>
      {state === "error" && (
        <p style={{ color: "var(--panic-deep)", fontSize: 14, width: "100%", marginTop: 4 }}>{msg}</p>
      )}
    </form>
  );
}
