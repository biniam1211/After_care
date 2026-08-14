import { ImageResponse } from "next/og";

// The share card. This link gets passed around by text and DM more than it
// gets found by search, so the preview image is the first impression far more
// often than the homepage is.

export const alt = "AfterCare — The missing parent in your pocket";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #12496b 0%, #0a3a59 45%, #06283d 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "linear-gradient(160deg, #41B0FF, #1B7FE0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 99,
                background: "#FFE7C7",
                display: "flex",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            AfterCare
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.03,
              letterSpacing: -3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The missing parent</span>
            <span>in your pocket.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,.75)",
              marginTop: 26,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Adulting after foster care — figured out step by step, by people
            who&rsquo;ve been there.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 99,
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.22)",
              color: "#bfe4ff",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Free forever
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 99,
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.22)",
              color: "#bfe4ff",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Built by foster kids
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
