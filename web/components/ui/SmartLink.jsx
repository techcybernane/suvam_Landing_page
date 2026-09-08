import Link from "next/link";

/**
 * Renders an internal Next <Link> for app paths ("/about"), and a plain <a>
 * for everything else (mailto:, tel:, external URLs, in-page #anchors).
 */
export default function SmartLink({ href, children, ...rest }) {
  const isInternal = typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
