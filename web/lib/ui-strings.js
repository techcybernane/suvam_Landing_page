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
    showSlide: "Show slide",
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

    // 404
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist.",
    notFoundCta: "Back to home",
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
    showSlide: "Afficher la diapositive",
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

    notFoundTitle: "Page introuvable",
    notFoundBody: "La page que vous cherchez n'existe pas.",
    notFoundCta: "Retour à l'accueil",
  },

  ar: {
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    close: "إغلاق",
    backToTop: "العودة إلى الأعلى",
    breadcrumb: "مسار التنقل",
    startConversation: "ابدأ محادثة",
    switchLanguage: "تغيير اللغة",

    featured: "مميّز",
    showSlide: "عرض الشريحة",
    previousSlide: "الشريحة السابقة",
    nextSlide: "الشريحة التالية",
    pauseCarousel: "إيقاف العرض مؤقتًا",
    playCarousel: "تشغيل العرض",
    previousItem: "العنصر السابق",
    nextItem: "العنصر التالي",
    explore: "استكشف",

    fullName: "الاسم الكامل",
    organization: "المؤسسة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    namePlaceholder: "محمد أحمد",
    organizationPlaceholder: "مؤسستك",
    emailPlaceholder: "name@company.com",
    phonePlaceholder: "+235 00 00 00 00",
    messageLabel: "أخبرنا عن مشروعك أو التحدّي الذي تواجهه",
    messagePlaceholder: "ما الذي تسعى إلى بنائه أو تأمينه أو تحديثه؟",
    popupMessageLabel: "هل من شيء ينبغي أن نعرفه؟ (اختياري)",
    popupMessagePlaceholder: "سطر عن بيئتك أو هدفك",
    sending: "جارٍ الإرسال…",
    sendRequest: "إرسال الطلب",
    requestSent: "تم إرسال الطلب",
    requestSentBody: "شكرًا لتواصلك — سنعاود الاتصال بك خلال يوم عمل واحد.",
    sendAnother: "إرسال طلب آخر",
    noFaqs: "لا توجد أسئلة شائعة بعد.",

    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody: "الصفحة التي تبحث عنها غير موجودة.",
    notFoundCta: "العودة إلى الرئيسية",
  },
};

export function t(locale, key) {
  return STRINGS[locale]?.[key] ?? STRINGS[DEFAULT_LOCALE][key] ?? key;
}

/** Bound translator, so components can call `t("key")`. */
export function translator(locale) {
  return (key) => t(locale, key);
}
