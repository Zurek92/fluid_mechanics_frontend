// calculate headloss in selected pipe
import { headlossShowResponse } from '../api_interaction/responses.js'
import { headlossListeners } from '../forms/actions.js'
import { generateSelectOption } from '../forms/forms.js'
import { getHeadlossFlowData, getHeadlossPowerData } from '../forms/prepare_jsons.js'
import { validateHeadlossFlowData, validateHeadlossPowerData } from '../forms/validation.js'
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