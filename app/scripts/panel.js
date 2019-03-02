panel.innerHTML = `
<div class="panel_centered">
    <a href="/">${getTranslatedSentence("mainPage")}</a>
</div>
<div>
    <form class="panel_centered">
        <select id="selectLanguage">
            <option>English Language</option>
            <option>Język Polski</option>
        </select>
    </form>
</div>
`

selectLanguage.selectedIndex = getTranslatedSentence("selectedLanguage");

selectLanguage.addEventListener("change", () => {
    let cookieLangValue = ""
    if (selectLanguage.value == "English Language") {
        cookieLangValue = "eng";
    } else if (selectLanguage.value == "Język Polski") {
        cookieLangValue = "pl";
    }
    document.cookie = `userLanguage=${cookieLangValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    userLanguage = getUserCookieLanguage();
    location.reload();
})