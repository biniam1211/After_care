// AfterCare brand mark — a lifebuoy ring (rescue) cradling a sunrise (hope).
export default function Logo({ size = 28, onDark = false }) {
  const ring = onDark ? "#fff" : "#2e9bff";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke={ring} strokeWidth="5" opacity="0.25" />
      {/* sunrise */}
      <path d="M11 30a13 13 0 0 1 26 0" fill="none" stroke="#ff9e57" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="24" y1="9" x2="24" y2="4" stroke="#ff9e57" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="38" y1="15" x2="41.5" y2="11.5" stroke="#ff9e57" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="10" y1="15" x2="6.5" y2="11.5" stroke="#ff9e57" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="8" y1="30" x2="40" y2="30" stroke={ring} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
