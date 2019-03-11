import { getUserCookie } from '../cookies/preferences.js'
import { languageDictionary } from './dictionary.js';

export function languageWord(key) {
    return languageDictionary[key][userLanguage];
}

const userLanguageCookie = document.cookie;
if (!userLanguageCookie) {
    document.cookie = "userLanguage=eng; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

export const userLanguage = getUserCookie("userLanguage", "eng");
