'use client'

import i18n from "i18next"
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import homepageTranslationPT from './locales/pt-BR/home.json'
import productsTranslationPT from './locales/pt-BR/products.json'
import cartTranslationPT from './locales/pt-BR/cart.json'
import checkoutTranslationPT from './locales/pt-BR/checkout.json'
import loginTranslationPT from './locales/pt-BR/login.json'
import navTranslationPT from './locales/pt-BR/nav.json'
import contactsTranslationPT from './locales/pt-BR/contacts.json'
import userPageTranslationPT from './locales/pt-BR/userpage.json'

import homepageTranslationEN from './locales/en/home.json'
import productsTranslationEN from './locales/en/products.json'
import cartTranslationEN from './locales/en/cart.json'
import checkoutTranslationEN from './locales/en/checkout.json'
import loginTranslationEN from './locales/en/login.json'
import navTranslationEN from './locales/en/nav.json'
import contactsTranslationEN from './locales/en/contacts.json'
import userPageTranslationEN from './locales/en/userpage.json'


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: 'pt',
        fallbackLng: 'en',
        resources: {
            en: {
                "translation": {...homepageTranslationEN, ...productsTranslationEN, ...cartTranslationEN, ...checkoutTranslationEN, ...loginTranslationEN, ...navTranslationEN, ...contactsTranslationEN, ...userPageTranslationEN}
            },
            pt: {
                translation: {...homepageTranslationPT, ...productsTranslationPT, ...cartTranslationPT, ...checkoutTranslationPT, ...loginTranslationPT, ...navTranslationPT, ...contactsTranslationPT, ...userPageTranslationPT}
            }
        },
        interpolation: {
            escapeValue: false
        },
    })

export default i18n