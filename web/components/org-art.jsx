// ───────────────────────────────────────────────────────────
// AfterCare — original SVG illustrations for the org site.
//
// Every illustration here is drawn from scratch (simple geometric
// shapes) for AfterCare. No stock photos, no copied artwork, no
// other organization's images.
// ───────────────────────────────────────────────────────────

function Frame({ children, label }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={label}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {children}
    </svg>
  );
}

export function SunriseArt() {
  return (
    <Frame label="Sunrise over a neighborhood of small houses">
      <defs>
        <linearGradient id="sr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec8ff" />
          <stop offset="100%" stopColor="#fff2d9" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#sr-sky)" />
      <circle cx="160" cy="92" r="34" fill="#ff9e57" />
      <circle cx="160" cy="92" r="48" fill="#ff9e57" opacity="0.25" />
      <ellipse cx="160" cy="210" rx="200" ry="70" fill="#17b98a" />
      <ellipse cx="60" cy="200" rx="110" ry="48" fill="#0e8a68" />
      <g>
        <rect x="38" y="128" width="44" height="36" rx="4" fill="#ffffff" />
        <path d="M34 130 L60 108 L86 130 Z" fill="#f2823a" />
        <rect x="54" y="142" width="12" height="22" fill="#06283d" />
      </g>
      <g>
        <rect x="118" y="122" width="52" height="42" rx="4" fill="#ffffff" />
        <path d="M113 124 L144 98 L175 124 Z" fill="#2e9bff" />
        <rect x="136" y="140" width="14" height="24" fill="#06283d" />
      </g>
      <g>
        <rect x="236" y="130" width="44" height="34" rx="4" fill="#ffffff" />
        <path d="M232 132 L258 110 L284 132 Z" fill="#ff9e57" />
        <rect x="252" y="144" width="12" height="20" fill="#06283d" />
      </g>
      <path d="M144 200 L160 164 L176 200 Z" fill="#fff6e5" opacity="0.9" />
    </Frame>
  );
}

export function MapArt() {
  return (
    <Frame label="A map with pins marking help nearby">
      <rect width="320" height="200" fill="#e7f4ff" />
      <path d="M0 60 Q80 40 160 70 T320 55 V200 H0 Z" fill="#cfeaff" />
      <path d="M0 140 Q90 115 180 140 T320 130 V200 H0 Z" fill="#bfe4ff" />
      <path
        d="M60 150 L120 110 L170 128 L240 70 L272 96"
        fill="none"
        stroke="#f2823a"
        strokeWidth="3"
        strokeDasharray="7 6"
        strokeLinecap="round"
      />
      {[
        [60, 150, "#2e9bff"],
        [120, 110, "#17b98a"],
        [170, 128, "#f2823a"],
        [240, 70, "#dd2129"],
      ].map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="14" fill={c} />
          <path d={`M${x} ${y + 12} L${x - 7} ${y + 26} L${x + 7} ${y + 26} Z`} fill={c} />
          <circle cx={x} cy={y} r="5" fill="#fff" />
        </g>
      ))}
    </Frame>
  );
}

export function CompassArt() {
  return (
    <Frame label="A compass pointing the way forward">
      <rect width="320" height="200" fill="#06283d" />
      <circle cx="160" cy="100" r="70" fill="none" stroke="#7ec8ff" strokeWidth="2" />
      <circle cx="160" cy="100" r="52" fill="none" stroke="#ffffff" strokeOpacity="0.25" />
      <path d="M160 38 L176 100 L160 162 L144 100 Z" fill="#ff9e57" />
      <path d="M98 100 L160 84 L222 100 L160 116 Z" fill="#2e9bff" />
      <circle cx="160" cy="100" r="10" fill="#fff" />
      <text x="160" y="24" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">N</text>
      <circle cx="52" cy="48" r="3" fill="#ffd97a" />
      <circle cx="272" cy="60" r="3" fill="#ffd97a" />
      <circle cx="262" cy="152" r="3" fill="#ffd97a" />
      <circle cx="58" cy="158" r="3" fill="#ffd97a" />
    </Frame>
  );
}

export function CommunityArt() {
  const figures = [
    [70, 90, "#ff9e57"],
    [120, 70, "#2e9bff"],
    [175, 68, "#17b98a"],
    [225, 86, "#f2823a"],
    [258, 110, "#7ec8ff"],
    [60, 130, "#ffd97a"],
  ];
  return (
    <Frame label="A circle of people around a heart">
      <rect width="320" height="200" fill="#fff2e7" />
      {figures.map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="14" fill={c} />
          <path d={`M${x - 20} ${y + 44} Q${x} ${y + 8} ${x + 20} ${y + 44} Z`} fill={c} opacity="0.85" />
        </g>
      ))}
      <path
        d="M160 148 C140 132 118 142 118 122 C118 108 138 106 160 122 C182 106 202 108 202 122 C202 142 180 132 160 148 Z"
        fill="#dd2129"
      />
    </Frame>
  );
}

export function GrowthArt() {
  return (
    <Frame label="Steps climbing upward toward a flag">
      <rect width="320" height="200" fill="#e2f7ef" />
      <g fill="#17b98a">
        <rect x="36" y="150" width="52" height="18" rx="4" />
        <rect x="96" y="126" width="52" height="42" rx="4" />
        <rect x="156" y="100" width="52" height="68" rx="4" />
        <rect x="216" y="72" width="52" height="96" rx="4" />
      </g>
      <g>
        <rect x="252" y="26" width="4" height="50" fill="#06283d" />
        <path d="M256 26 L286 34 L256 44 Z" fill="#f2823a" />
      </g>
      <circle cx="70" cy="60" r="4" fill="#ffd97a" />
      <circle cx="120" cy="40" r="4" fill="#ffd97a" />
      <circle cx="200" cy="48" r="4" fill="#ffd97a" />
    </Frame>
  );
}

export function OrgArt({ kind }) {
  if (kind === "map") return <MapArt />;
  if (kind === "compass") return <CompassArt />;
  if (kind === "community") return <CommunityArt />;
  if (kind === "growth") return <GrowthArt />;
  return <SunriseArt />;
}
