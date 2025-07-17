// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          title: "AI on FHIR Query Tool",
          placeholder: "e.g. Show me diabetic patients over 50",
          search: "Search",
          loading: "Loading...",
          condition: "Condition",
          minAge: "Min Age",
          noResults: "No matching patients found.",
          filters: {
            age: "Age",
            gender: "Gender",
            any: "Any",
            over40: "Over 40",
            over50: "Over 50",
            over60: "Over 60",
            male: "Male",
            female: "Female"
          }
        },
      },
      es: {
        translation: {
          title: "Herramienta de Consulta AI on FHIR",
          placeholder: "por ejemplo: Muéstrame pacientes diabéticos mayores de 50",
          search: "Buscar",
          loading: "Cargando...",
          condition: "Condición",
          minAge: "Edad Mínima",
          noResults: "No se encontraron pacientes coincidentes.",
          filters: {
            age: "Edad",
            gender: "Género",
            any: "Cualquiera",
            over40: "Mayor de 40",
            over50: "Mayor de 50",
            over60: "Mayor de 60",
            male: "Hombre",
            female: "Mujer"
          }
        },
      },
    },
  });

export default i18n;
