const LABELS = {
  about: "About",
  solutions: "Solutions",
  cybersecurity: "Cybersecurity",
  "network-infrastructure": "Network & IT Infrastructure",
  "software-development": "Web & Software Development",
  "it-consulting": "IT Consulting & Digital Transformation",
  "managed-it": "Managed IT Services",
  "training-certifications": "Training & Certifications",
  industries: "Industries",
  insights: "Insights",
  contact: "Contact",
};

export function breadcrumbFor(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    crumbs.push({ label: LABELS[seg] || seg, href: acc });
  }
  return crumbs;
}
