import i18n from 'i18next';
import enTrans from '@/locales/en/translations.json';
import ukTrans from '@/locales/uk/translations.json';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: enTrans
    },
    uk: {
        translation: ukTrans
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'uk',
        fallbackLng: 'uk',

        interpolation: {
            escapeValue: false,
        },
        ns: ['translation'],
        defaultNS: 'translation',
    })


export default i18n;
