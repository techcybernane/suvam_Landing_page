import { Link } from "react-router-dom";

/**
 * Renders an internal react-router <Link> for app paths ("/about"),
 * and a plain <a> for everything else (mailto:, tel:, external URLs).
 */
export default function SmartLink({ href, children, ...rest }) {
  const isInternal = typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link to={href} {...rest}>
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
