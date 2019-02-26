const base_api_url = 'http://localhost:12000'
const base_frontend_url = 'http://localhost:13000'


function getUserCookieLanguage() {
    try {
        return document.cookie.split("userLanguage=")[1].split(";")[0];
    } catch {
        return 'eng';
    }
}

let userLanguage = document.cookie;
if (!userLanguage) {
    document.cookie = "userLanguage=eng; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    userLanguage = getUserCookieLanguage();
}

userLanguage = getUserCookieLanguage();
