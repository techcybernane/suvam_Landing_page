/**
 * Minimal chrome used when the CMS API is unreachable so the public site still
 * renders a branded shell instead of a blank "port 4000" error.
 * Nav/footer match the seeded defaults; admin edits only appear once the API is back.
 */
export const FALLBACK_META = {
  brand: {
    name: "CybernaNet",
    tagline: "Innovate. Secure. Transform.",
  },
  nav: {
    links: [
      { id: "about", label: "About", href: "/about" },
      {
        id: "solutions",
        label: "Solutions",
        href: "/solutions",
        children: [
          { id: "cyber", label: "Cybersecurity", href: "/solutions/cybersecurity" },
          { id: "net", label: "Network & IT Infrastructure", href: "/solutions/network-infrastructure" },
          { id: "soft", label: "Web & Software Development", href: "/solutions/software-development" },
          { id: "consult", label: "IT Consulting & Digital Transformation", href: "/solutions/it-consulting" },
          { id: "managed", label: "Managed IT Services", href: "/solutions/managed-it" },
          { id: "train", label: "Training & Certifications", href: "/solutions/training-certifications" },
        ],
      },
      { id: "industries", label: "Industries", href: "/industries" },
      { id: "insights", label: "Insights", href: "/insights" },
      { id: "contact", label: "Contact", href: "/contact" },
    ],
    ctaPrimary: { label: "Talk to an Expert", href: "/contact" },
  },
  footer: {
    tagline:
      "Building resilient digital infrastructure. Protecting critical digital assets. Developing the skills that will shape Africa's digital future.",
    columns: [
      {
        id: "solutions",
        title: "Solutions",
        links: [
          { id: "s1", label: "Solutions Overview", href: "/solutions" },
          { id: "s2", label: "Cybersecurity", href: "/solutions/cybersecurity" },
          { id: "s3", label: "Contact", href: "/contact" },
        ],
      },
      {
        id: "company",
        title: "Company",
        links: [
          { id: "c1", label: "About Us", href: "/about" },
          { id: "c2", label: "Industries", href: "/industries" },
          { id: "c3", label: "Insights", href: "/insights" },
          { id: "c4", label: "Contact", href: "/contact" },
        ],
      },
    ],
    social: [],
    copyright: `© ${new Date().getFullYear()} CybernaNet | All Rights Reserved`,
  },
  popup: { enabled: false },
};
