"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, localizeHref } from "../../lib/i18n.js";

/**
 * Renders an internal Next <Link> for app paths ("/about"), and a plain <a>
 * for everything else (mailto:, tel:, external URLs, in-page #anchors).
 *
 * Internal hrefs are rewritten into the locale currently being viewed, so a
 * visitor reading the French site stays on the French site without every
 * link in the CMS needing a translated copy.
 */
export default function SmartLink({ href, children, ...rest }) {
  const pathname = usePathname();
  const isInternal = typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link href={localizeHref(href, localeFromPathname(pathname))} {...rest}>
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
