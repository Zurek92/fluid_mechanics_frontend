import { languageWord } from '../languages/language_options.js';

export function getUserCookie(selectedCookie, defaultValue) {
    try {
        return document.cookie.split(`${selectedCookie}=`)[1].split(";")[0];
    } catch {
        return defaultValue;
    }
}

function showCookiesInfo(blocked=false) {
    const cookieButton = `<button type="button">${languageWord("acceptButton")}</button>`
    document.body.innerHTML += `
    <div class="cookiesInfoLabel">
        <span>${languageWord(blocked ? "cookiesBlocked" : "cookiesInfo")}</span>
        ${blocked ? '': cookieButton}
    </div>`;
}

if (getUserCookie("cookieInfo", "blocked") != "accepted") {
    document.cookie = "cookieInfo=show; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    let cookieStatus = getUserCookie("cookieInfo", "blocked");
    switch(cookieStatus) {
        case "show":
            showCookiesInfo();
            document.querySelector("div.cookiesInfoLabel button").addEventListener("click", () => {
                document.cookie = "cookieInfo=accepted; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                document.querySelector("div.cookiesInfoLabel").style.display = "none";
            })
            break;
        case "blocked":
            showCookiesInfo(true);
            break;
    }
}
