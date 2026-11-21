"use client";

/**
 * Quick Exit — gov / DV-site pattern. One tap leaves to a neutral site
 * and tries to replace history so the back button is safer.
 */
export function QuickExit() {
  const leave = () => {
    try {
      window.open("https://www.google.com", "_newtab");
    } catch {
      /* ignore */
    }
    window.location.replace("https://www.google.com");
  };

  return (
    <button type="button" className="mk-quick-exit" onClick={leave}>
      Quick exit
    </button>
  );
}
