import { DEFAULT_LOCALE } from "./i18n.js";

/**
 * The small set of user-visible strings that live in components rather than in
 * the CMS — button labels, form fields, aria-labels, placeholders. Everything
 * else on the site is editable content and is translated in the content tree.
 *
 * Missing keys fall back to English rather than rendering blank.
 */
const STRINGS = {
  en: {
    // navigation / chrome
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    backToTop: "Back to top",
    breadcrumb: "Breadcrumb",
    startConversation: "Start a Conversation",
    switchLanguage: "Change language",

    // carousels
    featured: "Featured",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    pauseCarousel: "Pause carousel",
    playCarousel: "Play carousel",
    previousItem: "Previous item",
    nextItem: "Next item",
    explore: "Explore",

    // forms
    fullName: "Full name",
    organization: "Organization",
    email: "Email",
    phone: "Phone",
    namePlaceholder: "Jane Doe",
    organizationPlaceholder: "Your organization",
    emailPlaceholder: "jane@company.com",
    phonePlaceholder: "+235 00 00 00 00",
    messageLabel: "Tell us about your project or challenge",
    messagePlaceholder: "What are you trying to build, secure or modernize?",
    popupMessageLabel: "Anything we should know? (optional)",
    popupMessagePlaceholder: "A line about your environment or goal",
    sending: "Sending…",
    sendRequest: "Send Request",
    requestSent: "Request sent",
    requestSentBody: "Thanks for reaching out — we'll get back to you within one business day.",
    sendAnother: "Send another request",
    noFaqs: "No FAQs yet.",
    alwaysOn: "Always on",
  },

  fr: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    close: "Fermer",
    backToTop: "Haut de page",
    breadcrumb: "Fil d'Ariane",
    startConversation: "Démarrer la conversation",
    switchLanguage: "Changer de langue",

    featured: "À la une",
    previousSlide: "Diapositive précédente",
    nextSlide: "Diapositive suivante",
    pauseCarousel: "Mettre en pause",
    playCarousel: "Lancer le défilement",
    previousItem: "Élément précédent",
    nextItem: "Élément suivant",
    explore: "Découvrir",

    fullName: "Nom complet",
    organization: "Organisation",
    email: "E-mail",
    phone: "Téléphone",
    namePlaceholder: "Jean Dupont",
    organizationPlaceholder: "Votre organisation",
    emailPlaceholder: "jean@entreprise.com",
    phonePlaceholder: "+235 00 00 00 00",
    messageLabel: "Parlez-nous de votre projet ou de votre défi",
    messagePlaceholder: "Que cherchez-vous à bâtir, sécuriser ou moderniser ?",
    popupMessageLabel: "Autre chose à nous signaler ? (facultatif)",
    popupMessagePlaceholder: "Une ligne sur votre environnement ou votre objectif",
    sending: "Envoi…",
    sendRequest: "Envoyer la demande",
    requestSent: "Demande envoyée",
    requestSentBody: "Merci de nous avoir contactés — nous revenons vers vous sous un jour ouvré.",
    sendAnother: "Envoyer une autre demande",
    noFaqs: "Aucune question pour le moment.",
    alwaysOn: "Toujours actif",
  },
};

export function t(locale, key) {
  return STRINGS[locale]?.[key] ?? STRINGS[DEFAULT_LOCALE][key] ?? key;
}

/** Bound translator, so components can call `t("key")`. */
export function translator(locale) {
  return (key) => t(locale, key);
}
