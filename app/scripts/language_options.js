const languageDictionary = {
    "selectedLanguage": {"eng": 0, "pl": 1},
    "URLHeadlossPageDescr": {
        "eng": "Calculate headloss and velocity in a pipe with a chosen diameter.",
        "pl": "Obliczanie straty ciśnienia i prędkości w rurze o wybranej średnicy."
    },
    "fluidsArrays": {"eng": ["water"], "pl": ["woda"]},
    "materialsArrays": {"eng": ["steel"], "pl": ["stal"]},
    "Calculate": {"eng": "Calculate", "pl": "Oblicz"},
    "ChooseMode": {"eng": "Choose mode", "pl": "Wybierz rodzaj"},    
    "Flow": {"eng": "Flow", "pl": "Przepływ"},
    "FlowUnit": {"eng": "Flow unit", "pl": "Jednostka przepływu"},
    "Fluid": {"eng": "Fluid", "pl": "Płyn"},
    "Headloss": {"eng": "Headloss", "pl": "Strata ciśnienia"},
    "HeadlossUnit": {"eng": "Headloss unit", "pl": "Jednostka straty ciśnienia"},
    "KnownFlow": {"eng": "Known flow", "pl": "Znany przepływ"},
    "KnownPower": {"eng": "Known power", "pl": "Znana moc"},
    "LocalLossCoefficient": {"eng": "Local loss coefficient", "pl": "Współczynnik strat miejscowych"},
    "Material": {"eng": "Material", "pl": "Materiał"},
    "NominalDiameter": {"eng": "Nominal diameter", "pl": "Średnica nominalna"},
    "PipeLength": {"eng": "Pipe length [m]", "pl": "Długość rury [m]"},
    "Power": {"eng": "Power", "pl": "Moc"},
    "PowerUnit": {"eng": "Power unit", "pl": "Jednostka mocy"},    
    "Roughness": {"eng": "Roughness", "pl": "Chropowatość"},
    "Temperature": {"eng": "Temperature", "pl": "Temperatura"},
    "TemperatureReturn": {"eng": "Temperature return", "pl": "Temperatura powrotu"},
    "TemperatureSupply": {"eng": "Temperature supply", "pl": "Temperatura zasilania"},
    "Velocity": {"eng": "Velocity", "pl": "Prędkość"},
    "Waiting": {"eng": "Waiting", "pl": "Oczekiwanie"},
    
    "wrongTemperature": {
        "eng": "Wrong temperature field! Should be integer between 0-200.",
        "pl": "Nieprawidłowa temperatura! Powinna być liczbą całkowitą pomiędzy 0 a 200."
    },
    "wrongTemperatureCompare": {
        "eng": "Temperature supply and return couldn't have the same values.",
        "pl": "Wartości temperatury zasilania i powrotu nie mogą być takie same."
    },
    "wrongFlow": {
        "eng": "Wrong flow field! Should be float higher than 0.",
        "pl": "Nieprawidłowy przepływ! Powinien być liczbą zmiennoprzecinkową większą od 0."
    },
    "wrongLength": {
        "eng": "Wrong length field! Should be float higher than 0.",
        "pl": "Nieprawidłowa długość! Powinna być liczbą zmiennoprzecinkową większą od 0."
    },
    "wrongRoughness": {
        "eng": "Wrong roughness field! Should be float higher than 0 and much lowest than diameter.",
        "pl": "Nieprawidłowa chropowatość! Powinna być liczbą zmiennoprzecinkową większą od 0 i znacząco mniejszą od średnicy."
    },
    "wrongLLC": {
        "eng": "Wrong local loss coefficient field! Should be float higher than or equal 0.",
        "pl": "Nieprawidłowy współczynnik strat miejscowych! Powinien być liczbą zmiennoprzecinkową większą lub równą 0."
    },
    "wrongPower": {
        "eng": "Wrong power field! Should be float higher than 0.",
        "pl": "Nieprawidłowa moc! Powinna być liczbą zmiennoprzecinkową większą od 0."
    },
}

function getUserCookieLanguage() {
    try {
        return document.cookie.split("userLanguage=")[1].split(";")[0];
    } catch {
        return 'eng';
    }
}

let userLanguageCookie = document.cookie;
if (!userLanguageCookie) {
    document.cookie = "userLanguage=eng; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

userLanguage = getUserCookieLanguage();


function getTranslatedSentence(key) {
    return languageDictionary[key][userLanguage];
}

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

