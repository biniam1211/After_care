// ───────────────────────────────────────────────────────────
// AfterCare — shared photo figure for licensed stock imagery
//
// OrgPhoto is for ILLUSTRATIVE imagery only. It must never be used
// for a real person, a story subject, a member, or next to any
// person's name or quote. Every photo carries a visible
// "Illustrative photo" caption + photographer credit, and states
// plainly that the people pictured are not AfterCare youth.
// Real AfterCare stories use only photos supplied by the people
// who lived them, with permission. See
// web/public/images/CREDITS.md for full attribution.
// ───────────────────────────────────────────────────────────
export function OrgPhoto({ src, alt, caption, photographer, eager, width, height }) {
  return (
    <figure className="mk-photo">
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        width={width}
        height={height}
      />
      <figcaption>
        <b>Illustrative photo —</b> {caption} Photo: {photographer} via
        Pexels. Not an AfterCare youth.
      </figcaption>
    </figure>
  );
}
