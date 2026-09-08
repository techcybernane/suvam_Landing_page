/**
 * Splits `text` on any of `words` (case-insensitive) and wraps matches in a
 * styled <span>, so admin-edited copy can carry inline emphasis without HTML.
 */
export function highlightText(text, words = [], className = "text-forest") {
  if (!text) return null;
  const clean = words.filter(Boolean);
  if (clean.length === 0) return text;

  const pattern = new RegExp(`(${clean.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    clean.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
