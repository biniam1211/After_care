/**
 * Founder photo catalog and shared figure components for the org site.
 *
 * Photos are real images from Biniam Efrem's life as a foster youth.
 * Captions stay simple — no invented quotes or names. The long-form
 * founder story text is a placeholder for Biniam to write himself.
 */
import Image from "next/image";

/** @typedef {{ id: string, src: string, alt: string, caption: string, width: number, height: number }} FounderPhoto */

/** @type {FounderPhoto[]} */
export const FOUNDER_PHOTOS = [
  {
    id: "grad-mom",
    src: "/founder/graduation-with-foster-mom.jpg",
    alt: "Biniam Efrem in cap and gown with a lei and Moreno Valley High School diploma, sitting with his foster mom.",
    caption: "Graduation day with my foster mom",
    width: 1500,
    height: 1125,
  },
  {
    id: "grad-dad",
    src: "/founder/graduation-with-foster-dad.jpg",
    alt: "Biniam Efrem holding his high school diploma, standing with his foster dad.",
    caption: "Graduation day with my foster dad",
    width: 1500,
    height: 1125,
  },
  {
    id: "christmas",
    src: "/founder/christmas-with-foster-parents.jpg",
    alt: "Biniam Efrem with both foster parents at Christmas.",
    caption: "Christmas with my foster parents",
    width: 1500,
    height: 1125,
  },
  {
    id: "first-job",
    src: "/founder/first-job-warehouse.jpg",
    alt: "Biniam Efrem mopping a warehouse floor at his first job.",
    caption: "My first job",
    width: 1500,
    height: 2000,
  },
  {
    id: "first-car",
    src: "/founder/first-car.jpg",
    alt: "Biniam Efrem in a safety vest at the window of his first car, a silver sedan.",
    caption: "My first car",
    width: 1500,
    height: 2000,
  },
];

/**
 * Look up a founder photo by id.
 * @param {string} id
 * @returns {FounderPhoto | undefined}
 */
export function getFounderPhoto(id) {
  return FOUNDER_PHOTOS.find((p) => p.id === id);
}

/**
 * Journey milestones for the home and about founder sections.
 * Order: foster care / family → graduation → first job → first car.
 */
export const FOUNDER_JOURNEY = [
  {
    step: "01",
    title: "Foster care",
    blurb: "Growing up in care — and building the guide that should have existed then.",
    photoId: "christmas",
  },
  {
    step: "02",
    title: "Graduation",
    blurb: "Walking across the stage at Moreno Valley High School with foster parents who showed up.",
    photoId: "grad-mom",
  },
  {
    step: "03",
    title: "First job",
    blurb: "Clocking in, learning the floor, figuring out adulthood one shift at a time.",
    photoId: "first-job",
  },
  {
    step: "04",
    title: "First car",
    blurb: "Independence on four wheels — the same milestone AfterCare now helps others reach.",
    photoId: "first-car",
  },
];

/**
 * Clearly marked placeholder block for Biniam's personal story text.
 * @param {{ className?: string }} [props]
 */
export function FounderStoryPlaceholder({ className = "" }) {
  return (
    <aside
      className={`mk-placeholder ${className}`.trim()}
      aria-label="Founder story placeholder"
    >
      <p className="mk-placeholder-label">Placeholder — for Biniam to write</p>
      <p>
        This is where Biniam Efrem&rsquo;s personal founder story will go —
        in his own words. Until then, the photos below are real moments from
        his life in foster care. No invented quotes or details.
      </p>
    </aside>
  );
}

/**
 * Single founder photo figure with caption.
 * @param {{ photoId: string, priority?: boolean, sizes?: string, className?: string }} props
 */
export function FounderFigure({
  photoId,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 560px",
  className = "",
}) {
  const photo = getFounderPhoto(photoId);
  if (!photo) return null;

  return (
    <figure className={`mk-photo ${className}`.trim()}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className="mk-photo-img"
      />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}
