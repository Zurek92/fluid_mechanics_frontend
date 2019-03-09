// selecting pipe by velocity and headloss
import { headlossListeners } from '../fetch_scripts.js'
import { generatePipesFlowForm, generatePipesPowerForm } from '../fetch_scripts.js'
import { getPipesFlowData, getPipesPowerData } from '../fetch_scripts.js'
import { validatePipesFlowData, validatePipesPowerData } from '../fetch_scripts.js'
import { pipesShowResponse } from '../fetch_scripts.js'

import { generateSelectOption } from '../forms/forms.js'
import { languageWord } from '../languages/language_options.js';

const optionsArray = [
    languageWord("KnownFlow"),
    languageWord("KnownPower")
]

calcMode.innerHTML = generateSelectOption('', "ChooseMode", optionsArray, "ChooseMode");

headlossListeners(
    "calculate/pipes",
    generatePipesFlowForm,
    generatePipesPowerForm,
    getPipesFlowData,
    getPipesPowerData,
    validatePipesFlowData,
    validatePipesPowerData,
    pipesShowResponse,
); 