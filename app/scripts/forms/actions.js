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

export function headlossListeners(url, template, jsonData, validateData, funcShowResp) {
    calcMode.addEventListener("change", () => {
        let formData;
        let flowMode;
        switch(calcMode.value) {
            case languageWord("KnownFlow"):
                flowMode = "flow";
                break;
            case languageWord("KnownPower"):
                flowMode = "power";
                break;
        }
        optionsForm.innerHTML = generateHeadlossForm(flowMode, template);
        document.querySelector("form > button").addEventListener("click", () => {
            formData = jsonData(flowMode, template);
            fetchData(url, formData, validateData(formData, flowMode, template), funcShowResp);
        })
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
