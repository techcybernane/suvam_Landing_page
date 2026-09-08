"use client";

/**
 * Edge-to-edge infinite ticker. The track holds the items twice and slides
 * exactly -50%, so the loop point is invisible; `.fade-x` masks both ends.
 * Hovering pauses it so a reader can actually read an item.
 */
export default function Marquee({
  items = [],
  speed = 32,
  reverse = false,
  separator = "•",
  className = "",
  itemClassName = "",
}) {
  if (!items.length) return null;
  const doubled = [...items, ...items];

  return (
    <div className={`fade-x group relative overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused]"
        style={{
          "--marquee-duration": `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`flex shrink-0 items-center gap-10 ${itemClassName}`}>
            {item}
            <span aria-hidden className="text-signal/60">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
