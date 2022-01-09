import i18n from 'i18next';
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from './en.json'
import translationPL from './pl.json'

const resources = {
    en: {
      translation: translationEN
    },
    pl: {
      translation: translationPL
    }
  };

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources
  });

export default i18n;