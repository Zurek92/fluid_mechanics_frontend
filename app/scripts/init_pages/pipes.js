// selecting pipe by velocity and headloss
import { pipesShowResponse } from '../api_interaction/responses.js'
import { headlossListeners } from '../forms/actions.js'
import { generateSelectOption } from '../forms/forms.js'
import { getHeadlossData } from '../forms/prepare_jsons.js'
import { validateHeadlossData } from '../forms/validation.js'

import { languageWord } from '../languages/language_options.js';

const optionsArray = [
    languageWord("KnownFlow"),
    languageWord("KnownPower")
]

calcMode.innerHTML = generateSelectOption('', "ChooseMode", optionsArray, "ChooseMode");

headlossListeners(
    "calculate/pipes",
    "pipes",
    getHeadlossData,
    validateHeadlossData,
    pipesShowResponse,
); 