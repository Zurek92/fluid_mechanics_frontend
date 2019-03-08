// selecting pipe by velocity and headloss
import { createCalcModeForm, headlossListeners } from '../fetch_scripts.js'
import { generatePipesFlowForm, generatePipesPowerForm } from '../fetch_scripts.js'
import { getPipesFlowData, getPipesPowerData } from '../fetch_scripts.js'
import { validatePipesFlowData, validatePipesPowerData } from '../fetch_scripts.js'
import { pipesShowResponse } from '../fetch_scripts.js'

createCalcModeForm();
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