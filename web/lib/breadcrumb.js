import { stripLocale } from "./i18n.js";

// Route segment → label, per locale. Kept alongside the routes rather than in
// the CMS because these mirror URL structure, not editable copy.
const LABELS = {
  en: {
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
    _home: "Home",
  },
  fr: {
    about: "À propos",
    solutions: "Solutions",
    cybersecurity: "Cybersécurité",
    "network-infrastructure": "Réseaux et infrastructure IT",
    "software-development": "Développement web et logiciel",
    "it-consulting": "Conseil IT et transformation numérique",
    "managed-it": "Infogérance",
    "training-certifications": "Formations et certifications",
    industries: "Secteurs",
    insights: "Perspectives",
    contact: "Contact",
    _home: "Accueil",
  },
};

export function breadcrumbFor(pathname, locale = "en") {
  const labels = LABELS[locale] || LABELS.en;
  // Crumb hrefs stay unprefixed — SmartLink re-adds the current locale.
  const segments = stripLocale(pathname).split("/").filter(Boolean);
  const crumbs = [{ label: labels._home, href: "/" }];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    crumbs.push({ label: labels[seg] || seg, href: acc });
  }
  return crumbs;
}
