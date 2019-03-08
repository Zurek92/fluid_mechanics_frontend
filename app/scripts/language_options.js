import { languageDictionary } from './languages.js';

function getUserCookieLanguage() {
    try {
        return document.cookie.split("userLanguage=")[1].split(";")[0];
    } catch {
        return 'eng';
    }
}

const userLanguageCookie = document.cookie;
if (!userLanguageCookie) {
    document.cookie = "userLanguage=eng; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

let userLanguage = getUserCookieLanguage();


function getTranslatedSentence(key) {
    return languageDictionary[key][userLanguage];
}

export { getTranslatedSentence, getUserCookieLanguage, userLanguage };

