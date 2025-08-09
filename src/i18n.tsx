import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const basePath = window.location.pathname.includes("30-day-coffee-challenge")
  ? "/30-day-coffee-challenge"
  : "";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "pl", "ua", "ru"],
    fallbackLng: "pl",
    ns: ["translation", "privacy"], // all namespaces you have
    defaultNS: "translation",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie"], // Ignore browser language
      caches: ["localStorage"], // Only cache in localStorage
      lookupLocalStorage: "i18nextLng", // Explicit cache key
      excludeCacheFor: ["cimode"],
    },
    backend: {
      loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18n;
