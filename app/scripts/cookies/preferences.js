import { languageWord } from '../languages/language_options.js';

export function getUserCookie(selectedCookie, defaultValue) {
    try {
        return document.cookie.split(`${selectedCookie}=`)[1].split(";")[0];
    } catch {
        return defaultValue;
    }
}

export function addPermCookie(cookieKey, cookieValue) {
    document.cookie = `${cookieKey}=${cookieValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
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
    addPermCookie("cookieInfo", "show");
    let cookieStatus = getUserCookie("cookieInfo", "blocked");
    switch(cookieStatus) {
        case "show":
            showCookiesInfo();
            document.querySelector("div.cookiesInfoLabel button").addEventListener("click", () => {
                addPermCookie("cookieInfo", "accepted");
                document.querySelector("div.cookiesInfoLabel").style.display = "none";
            })
            break;
        case "blocked":
            showCookiesInfo(true);
            break;
    }
}

export const valuesToSave = ["flow_unit", "power_unit", "headloss_unit", "slope_unit"]

export function saveFormValues(formData) {
    for (let value of valuesToSave) {
        if (value in formData) {
            addPermCookie(value, formData[value]);
        }
    }
}

export function loadFormValues() {
    for (let elemValue of valuesToSave) {
        let elemId = document.getElementById(elemValue);
        if (elemId) {
            elemId.value = getUserCookie(elemValue, elemId.options[elemId.selectedIndex].value);
        }
    }
}
