// ───────────────────────────────────────────────────────────
// AfterCare — original SVG illustrations for the org site.
//
// Every illustration here is drawn from scratch (simple geometric
// shapes) for AfterCare. No stock photos, no copied artwork, no
// other organization's images.
//
// Palette discipline: ink, paper, stone, warm gray, and the single
// warm accent. No rainbow, no gradients, no glows. Texture comes
// from engraving-style hatching, not color.
// ───────────────────────────────────────────────────────────

const INK = "#1a1611";
const PAPER = "#faf6ee";
const STONE = "#e8e0ce";
const GRAY = "#c9bfa9";
const ACCENT = "#b3400f";

function Frame({ children, label }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={label}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="none" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="1" opacity="0.18" />
        </pattern>
        <pattern id="hatch-soft" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="none" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="1" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={PAPER} />
      {children}
    </svg>
  );
}

// Sun rendered as concentric ink rings over a hatched horizon.
export function SunriseArt() {
  return (
    <Frame label="Sunrise over a neighborhood of small houses">
      <rect x="0" y="140" width="320" height="60" fill="url(#hatch-soft)" />
      <line x1="0" y1="140" x2="320" y2="140" stroke={INK} strokeWidth="2" />
      <circle cx="160" cy="96" r="40" fill="none" stroke={INK} strokeWidth="2.5" />
      <circle cx="160" cy="96" r="28" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="160" cy="96" r="14" fill={ACCENT} />
      {[40, 90, 140, 190, 240, 290].map((x) => (
        <line key={x} x1={x} y1="30" x2={x} y2="42" stroke={INK} strokeWidth="2.5" />
      ))}
      {[
        [36, 112, 34],
        [120, 104, 44],
        [236, 112, 34],
      ].map(([x, y, w]) => (
        <g key={x}>
          <rect x={x} y={y} width={w} height={28} fill={PAPER} stroke={INK} strokeWidth="2" />
          <path d={`M${x - 5} ${y} L${x + w / 2} ${y - 16} L${x + w + 5} ${y} Z`} fill={INK} />
          <rect x={x + w / 2 - 4} y={y + 12} width="8" height="16" fill={INK} />
        </g>
      ))}
    </Frame>
  );
}

export function MapArt() {
  return (
    <Frame label="A map with pins marking help nearby">
      <rect width="320" height="200" fill="url(#hatch-soft)" />
      <path d="M0 60 Q80 40 160 70 T320 55" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.5" />
      <path d="M0 140 Q90 115 180 140 T320 130" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.5" />
      <path
        d="M60 150 L120 110 L170 128 L240 70 L272 96"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeDasharray="7 6"
        strokeLinecap="round"
      />
      {[
        [60, 150],
        [120, 110],
        [170, 128],
        [240, 70],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="12" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <circle cx={x} cy={y} r="4" fill={ACCENT} />
          <path d={`M${x} ${y + 11} L${x - 5} ${y + 22} L${x + 5} ${y + 22} Z`} fill={INK} />
        </g>
      ))}
    </Frame>
  );
}

export function CompassArt() {
  return (
    <Frame label="A compass pointing the way forward">
      <circle cx="160" cy="100" r="72" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <circle cx="160" cy="100" r="54" fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 160 + 60 * Math.sin(rad);
        const y1 = 100 - 60 * Math.cos(rad);
        const x2 = 160 + 70 * Math.sin(rad);
        const y2 = 100 - 70 * Math.cos(rad);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="2" />;
      })}
      <path d="M160 36 L176 100 L160 164 L144 100 Z" fill={INK} />
      <path d="M96 100 L160 84 L224 100 L160 116 Z" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="160" cy="100" r="9" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <text x="160" y="26" textAnchor="middle" fill={INK} fontSize="13" fontWeight="800" fontFamily="Georgia, serif">N</text>
    </Frame>
  );
}

export function CommunityArt() {
  const figures = [
    [70, 92],
    [120, 72],
    [175, 70],
    [225, 88],
    [258, 112],
    [60, 132],
  ];
  return (
    <Frame label="A circle of people around a table">
      {figures.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="13" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <path d={`M${x - 19} ${y + 42} Q${x} ${y + 10} ${x + 19} ${y + 42} Z`} fill={STONE} stroke={INK} strokeWidth="2" />
        </g>
      ))}
      <rect x="118" y="118" width="84" height="8" fill={INK} />
      <rect x="128" y="126" width="8" height="18" fill={INK} />
      <rect x="184" y="126" width="8" height="18" fill={INK} />
      <rect x="146" y="106" width="28" height="12" fill={PAPER} stroke={ACCENT} strokeWidth="2" />
    </Frame>
  );
}

export function GrowthArt() {
  return (
    <Frame label="Steps climbing upward toward a flag">
      <g fill="none" stroke={INK} strokeWidth="2.5">
        <rect x="36" y="150" width="52" height="18" />
        <rect x="96" y="126" width="52" height="42" />
        <rect x="156" y="100" width="52" height="68" />
        <rect x="216" y="72" width="52" height="96" />
      </g>
      <rect x="96" y="126" width="52" height="42" fill="url(#hatch)" opacity="0.6" />
      <rect x="216" y="72" width="52" height="96" fill="url(#hatch)" opacity="0.6" />
      <g>
        <rect x="252" y="26" width="4" height="50" fill={INK} />
        <path d="M256 26 L288 34 L256 44 Z" fill={ACCENT} />
      </g>
    </Frame>
  );
}

// A doorway, light coming through — the threshold into a first home.
export function DoorArt() {
  return (
    <Frame label="An open doorway with light coming through">
      <rect x="30" y="30" width="260" height="140" fill="url(#hatch-soft)" />
      <g>
        <rect x="120" y="40" width="80" height="130" fill={PAPER} stroke={INK} strokeWidth="3" />
        <path d="M120 40 L160 18 L200 40 Z" fill={INK} />
        <rect x="130" y="52" width="60" height="118" fill={ACCENT} opacity="0.16" />
        <line x1="160" y1="52" x2="160" y2="170" stroke={INK} strokeWidth="2" />
        <circle cx="184" cy="112" r="3.5" fill={INK} />
      </g>
      <line x1="30" y1="170" x2="290" y2="170" stroke={INK} strokeWidth="2.5" />
      <rect x="52" y="128" width="34" height="42" fill={STONE} stroke={INK} strokeWidth="2" />
      <rect x="234" y="128" width="34" height="42" fill={STONE} stroke={INK} strokeWidth="2" />
    </Frame>
  );
}

// A letter on ruled paper — the paperwork, made plain.
export function LetterArt() {
  return (
    <Frame label="A letter on ruled paper with a wax seal">
      <rect x="70" y="22" width="180" height="156" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      {[52, 74, 96, 118, 140].map((y) => (
        <line key={y} x1="86" y1={y} x2="234" y2={y} stroke={INK} strokeWidth="1" opacity="0.3" />
      ))}
      <rect x="86" y="28" width="52" height="10" fill={INK} />
      <circle cx="200" cy="152" r="14" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="200" cy="152" r="6" fill={ACCENT} />
      <path d="M86 162 L160 122 L234 162" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.4" />
    </Frame>
  );
}

// A winding road with mile markers — the road ahead, state by state.
export function RoadArt() {
  return (
    <Frame label="A winding road with mile markers stretching to the horizon">
      <line x1="0" y1="120" x2="320" y2="120" stroke={INK} strokeWidth="1.5" opacity="0.35" />
      <path
        d="M40 200 C60 150 90 140 130 130 C175 118 210 105 250 70 C272 54 292 46 320 40"
        fill="none"
        stroke={INK}
        strokeWidth="3"
      />
      <path
        d="M40 200 C60 150 90 140 130 130 C175 118 210 105 250 70 C272 54 292 46 320 40"
        fill="none"
        stroke={PAPER}
        strokeWidth="1"
        strokeDasharray="8 8"
      />
      {[
        [52, 178, "CA"],
        [128, 128, "1"],
        [208, 102, "2"],
        [268, 58, "3"],
      ].map(([x, y, t]) => (
        <g key={t}>
          <rect x={x - 12} y={y - 26} width="24" height="18" fill={PAPER} stroke={INK} strokeWidth="2" />
          <text x={x} y={y - 13} textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>{t}</text>
          <line x1={x} y1={y - 8} x2={x} y2={y + 2} stroke={INK} strokeWidth="2" />
        </g>
      ))}
      <circle cx="268" cy="58" r="6" fill={ACCENT} />
    </Frame>
  );
}

// A kitchen table: two cups, papers, a key — help that happens at a table, not in a portal.
export function TableArt() {
  return (
    <Frame label="A table with two cups, papers, and a key">
      <rect x="30" y="110" width="260" height="10" fill={INK} />
      <rect x="48" y="120" width="10" height="52" fill={INK} />
      <rect x="262" y="120" width="10" height="52" fill={INK} />
      <g>
        <rect x="70" y="78" width="26" height="32" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <path d="M96 84 Q108 84 106 94 Q104 102 96 100" fill="none" stroke={INK} strokeWidth="2.5" />
      </g>
      <g>
        <rect x="224" y="78" width="26" height="32" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <path d="M224 84 Q212 84 214 94 Q216 102 224 100" fill="none" stroke={INK} strokeWidth="2.5" />
      </g>
      <g>
        <rect x="128" y="84" width="64" height="26" fill="#ffffff" stroke={INK} strokeWidth="2" transform="rotate(-4 160 97)" />
        <line x1="136" y1="93" x2="184" y2="93" stroke={INK} strokeWidth="1.2" opacity="0.5" />
        <line x1="136" y1="99" x2="176" y2="99" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      </g>
      <g transform="translate(196 56)">
        <circle cx="0" cy="0" r="9" fill="none" stroke={ACCENT} strokeWidth="2.5" />
        <rect x="-2" y="8" width="4" height="16" fill={ACCENT} />
        <rect x="2" y="14" width="7" height="3" fill={ACCENT} />
        <rect x="2" y="20" width="7" height="3" fill={ACCENT} />
      </g>
    </Frame>
  );
}

// A ledger page: ruled rows, one accent entry — the record we keep.
export function LedgerArt() {
  return (
    <Frame label="A ledger page with ruled rows and one entry marked">
      <rect x="40" y="18" width="240" height="164" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      {[48, 74, 100, 126, 152].map((y, i) => (
        <g key={y}>
          <line x1="56" y1={y} x2="264" y2={y} stroke={INK} strokeWidth="1" opacity="0.35" />
          <rect x="56" y={y - 14} width={i === 2 ? 26 : 14} height="8" fill={i === 2 ? ACCENT : GRAY} />
          <rect x={i === 2 ? 96 : 84} y={y - 14} width={i === 2 ? 120 : 90} height="8" fill={STONE} />
        </g>
      ))}
      <circle cx="240" cy="100" r="16" fill="none" stroke={ACCENT} strokeWidth="2" />
      <path d="M232 100 L238 106 L250 92" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  );
}

export function OrgArt({ kind }) {
  if (kind === "map") return <MapArt />;
  if (kind === "compass") return <CompassArt />;
  if (kind === "community") return <CommunityArt />;
  if (kind === "growth") return <GrowthArt />;
  if (kind === "door") return <DoorArt />;
  if (kind === "letter") return <LetterArt />;
  if (kind === "road") return <RoadArt />;
  if (kind === "table") return <TableArt />;
  if (kind === "ledger") return <LedgerArt />;
  return <SunriseArt />;
}
