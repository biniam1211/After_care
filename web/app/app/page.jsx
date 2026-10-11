"use client";

import { useEffect, useState } from "react";
import App from "@/components/app-shell";

// Device design size (iPhone 15 logical points)
const DEVICE_W = 393;
const DEVICE_H = 852;

export default function Page() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const pad = 24;
      const s = Math.min(
        (window.innerWidth - pad) / DEVICE_W,
        (window.innerHeight - pad) / DEVICE_H,
        1
      );
      setScale(s > 0 ? s : 1);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div id="stage">
      <div id="scaler" style={{ "--scale": scale }}>
        <App />
      </div>
    </div>
  );
}
