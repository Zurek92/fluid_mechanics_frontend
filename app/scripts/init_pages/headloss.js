// calculate headloss in selected pipe
import { headlossListeners } from '../fetch_scripts.js'
import { getHeadlossFlowData, getHeadlossPowerData } from '../fetch_scripts.js'
import { validateHeadlossFlowData, validateHeadlossPowerData } from '../fetch_scripts.js'
import { headlossShowResponse } from '../fetch_scripts.js'

import { generateSelectOption } from '../forms/forms.js'
import { languageWord } from '../languages/language_options.js';

const optionsArray = [
    languageWord("KnownFlow"),
    languageWord("KnownPower")
]

calcMode.innerHTML = generateSelectOption('', "ChooseMode", optionsArray, "ChooseMode");

headlossListeners(
    "calculate/headloss",
    "headloss",
    getHeadlossFlowData,
    getHeadlossPowerData,
    validateHeadlossFlowData,
    validateHeadlossPowerData,
    headlossShowResponse,
);