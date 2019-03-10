import { manningShowResponse } from '../api_interaction/responses.js'
import { languageWord } from '../languages/language_options.js';
import { generateHeadlossForm, generateManningForm } from '../forms/forms.js'
import { getManningData } from '../forms/prepare_jsons.js'
import { validateManningData } from '../forms/validation.js'
import { fetchData } from '../api_interaction/fetch_api.js'

export function buttonDisable() {
    formButton.innerHTML = languageWord("Waiting");
}

export function buttonEnable() {
    formButton.innerHTML = languageWord("Calculate");
}

export function headlossListeners(
    url,
    template,
    flowData,
    powerData,
    validateFlow,
    validatePower,
    funcShowResp
) {
    calcMode.addEventListener("change", () => {
        if (calcMode.value == languageWord("KnownFlow")) {
            optionsForm.innerHTML = generateHeadlossForm("flow", template);
            document.querySelector("form > button").addEventListener("click", () => {
                fetchData(url, flowData(), validateFlow, funcShowResp)
            });
        } else if (calcMode.value == languageWord("KnownPower")) {
            optionsForm.innerHTML = generateHeadlossForm("power", template);
            document.querySelector("form > button").addEventListener("click", () => {
                fetchData(url, powerData(), validatePower, funcShowResp)
            });
        }
    })
}

export function manningListeners() {
    shapeMode.addEventListener("change", () => {
        optionsForm.innerHTML = generateManningForm();
        document.querySelector("form > button").addEventListener("click", () => {
            fetchData("/calculate/gravity_flow", getManningData(), validateManningData, manningShowResponse)
        });
    })
}