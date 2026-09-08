/** Small "live" indicator — a solid dot with an expanding ring pulsing off it. */
export default function LiveDot({ className = "" }) {
  return (
    <span className={`relative flex h-2 w-2 shrink-0 ${className}`} aria-hidden>
      <span className="animate-blip absolute inset-0 rounded-full bg-volt" />
      <span className="relative h-2 w-2 rounded-full bg-volt" />
    </span>
  );
}
