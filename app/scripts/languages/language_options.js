import { languageDictionary } from './dictionary.js';

function getUserCookieLanguage() {
    try {
        return document.cookie.split("userLanguage=")[1].split(";")[0];
    } catch {
        return 'eng';
    }
}

function languageWord(key) {
    return languageDictionary[key][userLanguage];
}

const userLanguageCookie = document.cookie;
if (!userLanguageCookie) {
    document.cookie = "userLanguage=eng; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

const userLanguage = getUserCookieLanguage();

export { languageWord, getUserCookieLanguage, userLanguage };
