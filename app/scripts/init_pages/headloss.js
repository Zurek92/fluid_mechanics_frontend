// calculate headloss in selected pipe
import { createCalcModeForm, headlossListeners } from '../fetch_scripts.js'
import { generateHeadlossFlowForm, generateHeadlossPowerForm } from '../fetch_scripts.js'
import { getHeadlossFlowData, getHeadlossPowerData } from '../fetch_scripts.js'
import { validateHeadlossFlowData, validateHeadlossPowerData } from '../fetch_scripts.js'
import { headlossShowResponse } from '../fetch_scripts.js'
createCalcModeForm();
headlossListeners(
    "calculate/headloss",
    generateHeadlossFlowForm,
    generateHeadlossPowerForm,
    getHeadlossFlowData,
    getHeadlossPowerData,
    validateHeadlossFlowData,
    validateHeadlossPowerData,
    headlossShowResponse,
);