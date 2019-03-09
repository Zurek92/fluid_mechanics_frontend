import { languageDictionary } from './languages/dictionary.js';
import { getTranslatedSentence } from './languages/language_options.js';
import {
    createCalcModeForm,
    createChannelShapeForm,
    generateHeadlossFlowForm,
    generateHeadlossPowerForm,
    generatePipesFlowForm,
    generatePipesPowerForm,
    generateManningForm
} from './forms/forms.js'

// general config
const base_api_url = 'http://localhost:12000'

// prepare forms

function buttonDisable() {
    formButton.innerHTML = getTranslatedSentence("Waiting");
}

function buttonEnable() {
    formButton.innerHTML = getTranslatedSentence("Calculate");
}

// listeners
function headlossListeners(
    url,
    flowFormFunc,
    powerFormFunc,
    flowData,
    powerData,
    validateFlow,
    validatePower,
    funcShowResp
) {
    calcMode.addEventListener("change", () => {
        if (calcMode.value == getTranslatedSentence("KnownFlow")) {
            optionsForm.innerHTML = flowFormFunc();
            document.querySelector("form > button").addEventListener("click", () => {
                fetchData(url, flowData(), validateFlow, funcShowResp)
            });
        } else if (calcMode.value == getTranslatedSentence("KnownPower")) {
            optionsForm.innerHTML = powerFormFunc();
            document.querySelector("form > button").addEventListener("click", () => {
                fetchData(url, powerData(), validatePower, funcShowResp)
            });
        }
    })
}

function manningListeners() {
    shapeMode.addEventListener("change", () => {
        optionsForm.innerHTML = generateManningForm();
        document.querySelector("form > button").addEventListener("click", () => {
            fetchData("/calculate/gravity_flow", getManningData(), validateManningData, manningShowResponse)
        });
    })
}

// validations
function validateIntBetween(intValue, intMin, intMax, msgKey, elem) {
    if (Number.isInteger(intValue) && intValue >= intMin && intValue <= intMax) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = getTranslatedSentence(msgKey);
    return 0
}

function validateFloatNonNegative(floatValue, msgKey, elem) {
    if (!isNaN(floatValue) && floatValue >= 0) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = getTranslatedSentence(msgKey);
    return 0
}

function validateFloatPositive(floatValue, msgKey, elem, valueMax=Infinity) {
    if (!isNaN(floatValue) && floatValue > 0 && floatValue <= valueMax) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = getTranslatedSentence(msgKey);
    return 0
}

function compareTemperatureValues(temperatureSupply, temperatureReturn, msgKey, elem) {
    if (temperatureSupply != temperatureReturn) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = getTranslatedSentence(msgKey);
    return 0
}

function validateHeadlossFlowData(formData) {
    if (
        [
            validateIntBetween(formData["temperature"], 0, 200, "wrongTemperature", errorTemperature),
            validateFloatPositive(formData["flow"], "wrongFlow", errorFlow),
            validateFloatPositive(formData["roughness"], "wrongRoughness", errorRoughness, 3),
            validateFloatPositive(formData["length"], "wrongLength", errorPipeLength),
            validateFloatNonNegative(formData["local_loss_coefficient"], "wrongLLC", errorLLC),
        ].includes(0)
    ) {
        return 0
    }
    return 1
}

function validateHeadlossPowerData(formData) {
    if (
        [
            validateIntBetween(formData["temperature_supply"], 0, 200, "wrongTemperature", errorTemperatureSupply),
            validateIntBetween(formData["temperature_return"], 0, 200, "wrongTemperature", errorTemperatureReturn),
            compareTemperatureValues(
                formData["temperature_supply"], 
                formData["temperature_return"], 
                "wrongTemperatureCompare", 
                errorTemperatureReturn
            ),
            validateFloatPositive(formData["power"], "wrongPower", errorPower),
            validateFloatPositive(formData["roughness"], "wrongRoughness", errorRoughness, 3),
            validateFloatPositive(formData["length"], "wrongLength", errorPipeLength),
            validateFloatNonNegative(formData["local_loss_coefficient"], "wrongLLC", errorLLC),
        ].includes(0)
    ) {
        return 0
    }
    return 1
}


function validatePipesFlowData(formData) {
    if (
        [
            validateIntBetween(formData["temperature"], 0, 200, "wrongTemperature", errorTemperature),
            validateFloatPositive(formData["flow"], "wrongFlow", errorFlow),
            validateFloatPositive(formData["roughness"], "wrongRoughness", errorRoughness, 3),
        ].includes(0)
    ) {
        return 0
    }
    return 1
}

function validatePipesPowerData(formData) {
    if (
        [
            validateIntBetween(formData["temperature_supply"], 0, 200, "wrongTemperature", errorTemperatureSupply),
            validateIntBetween(formData["temperature_return"], 0, 200, "wrongTemperature", errorTemperatureReturn),
            compareTemperatureValues(
                formData["temperature_supply"],
                formData["temperature_return"],
                "wrongTemperatureCompare",
                errorTemperatureReturn
            ),
            validateFloatPositive(formData["power"], "wrongPower", errorPower),
            validateFloatPositive(formData["roughness"], "wrongRoughness", errorRoughness, 3),
        ].includes(0)
    ) {
        return 0
    }
    return 1
}

function compareDimenstionsValues(channelDiameter, channelHeight, msgKey, elem) {
    if (channelDiameter >= channelHeight) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = getTranslatedSentence(msgKey);
    return 0
}

function validateManningData(formData) {
    const validationArray = [
        validateFloatPositive(formData["height"], "wrongHeight", errorHeight),
        validateFloatPositive(formData["slope"], "wrongChannelSlope", errorSlope),
        validateFloatPositive(formData["manning_coefficient"], "wrongManningCoefficient", errorManningCoefficient),
    ]
    if ("width" in formData) {
        validationArray.push(validateFloatPositive(formData["width"], "wrongChannelWidth", errorLinearDimension))
    } else if ("diameter" in formData) {
        validationArray.push(
            validateFloatPositive(formData["diameter"], "wrongChannelDiameter", errorLinearDimension),
            compareDimenstionsValues(formData["diameter"], formData["height"], "wrongHeightCompare", errorHeight)
        )
    }
    
    if (validationArray.includes(0)) {
        return 0
    }
    return 1
}

// prepare data in json structure
function getHeadlossFlowData() {
    return {
        "fluid": languageDictionary["fluidsArrays"]["eng"][fluid.selectedIndex],
        "temperature": parseInt(temperature.value, 10),
        "nominal_diameter": parseInt(nominal_diameter.value, 10),
        "material": languageDictionary["materialsArrays"]["eng"][material.selectedIndex],
        "flow": parseFloat(flow.value.replace(',', '.')),
        "flow_unit": flow_unit.value,
        "length": parseFloat(pipe_length.value.replace(',', '.')),
        "roughness": parseFloat(roughness.value.replace(',', '.')),
        "local_loss_coefficient": parseFloat(local_loss_coefficient.value.replace(',', '.')),
        "headloss_unit": headloss_unit.value
    }
}


function getHeadlossPowerData() {
    return {
        "fluid": languageDictionary["fluidsArrays"]["eng"][fluid.selectedIndex],
        "temperature_supply": parseInt(temperature_supply.value, 10),
        "temperature_return": parseInt(temperature_return.value, 10),
        "nominal_diameter": parseInt(nominal_diameter.value, 10),
        "material": languageDictionary["materialsArrays"]["eng"][material.selectedIndex],
        "power": parseFloat(power.value.replace(',', '.')),
        "power_unit": power_unit.value,
        "length": parseFloat(pipe_length.value.replace(',', '.')),
        "roughness": parseFloat(roughness.value.replace(',', '.')),
        "local_loss_coefficient": parseFloat(local_loss_coefficient.value.replace(',', '.')),
        "headloss_unit": headloss_unit.value
    }
}

function getPipesFlowData() {
    return {
        "fluid": languageDictionary["fluidsArrays"]["eng"][fluid.selectedIndex],
        "temperature": parseInt(temperature.value, 10),
        "material": languageDictionary["materialsArrays"]["eng"][material.selectedIndex],
        "flow": parseFloat(flow.value.replace(',', '.')),
        "flow_unit": flow_unit.value,
        "roughness": parseFloat(roughness.value.replace(',', '.')),
    }
}


function getPipesPowerData() {
    return {
        "fluid": languageDictionary["fluidsArrays"]["eng"][fluid.selectedIndex],
        "temperature_supply": parseInt(temperature_supply.value, 10),
        "temperature_return": parseInt(temperature_return.value, 10),
        "material": languageDictionary["materialsArrays"]["eng"][material.selectedIndex],
        "power": parseFloat(power.value.replace(',', '.')),
        "power_unit": power_unit.value,
        "roughness": parseFloat(roughness.value.replace(',', '.')),
    }
}

function getManningData() {
    let slope = parseFloat(channelSlope.value.replace(',', '.'));
    if (slopeUnit.value == '%') {
        slope /= 100;
    } else if (slopeUnit.value == '‰') {
        slope /= 1000;
    }
    
    let linearDim = {};
    if (document.getElementById("channelWidth")) {
        linearDim = {"width": parseFloat(channelWidth.value.replace(',', '.'))};
    } else if (document.getElementById("channelDiameter")) {
        linearDim = {"diameter": parseFloat(channelDiameter.value.replace(',', '.'))};
    }
    return {
        "height": parseFloat(channelHeight.value.replace(',', '.')),
        "slope": slope,
        "manning_coefficient": parseFloat(manningCoefficient.value.replace(',', '.')),
        ...linearDim
    }
}

// output data
function headlossShowResponse(resp) {
    return results.innerHTML += `
        <div>
        ${getTranslatedSentence("Headloss")}: ${resp['headloss']}${resp['headloss_unit']},
        ${getTranslatedSentence("Velocity")}: ${resp['velocity']}${resp['velocity_unit']}
        </div>
    `
}

function manningShowResponse(resp) {
    return results.innerHTML += `
        <div>
        ${getTranslatedSentence("Flow")}: ${resp['flow']}${resp['flow_unit']},
        ${getTranslatedSentence("Velocity")}: ${resp['velocity']}${resp['velocity_unit']}
        </div>
    `
}

function pipesShowResponse(resp) {
    let internalTable = '';
    for (let diameterResult of resp["results"]) {
        internalTable += `
        <tr>
            <td>${diameterResult["nominal_diameter"]}</td>
            <td>${diameterResult["headloss"]}</td>
            <td>${diameterResult["velocity"]}</td>
        </tr>
        `
    }
    return results.innerHTML = `
        <table>
            <tr>
                <th>${getTranslatedSentence("Diameter")}</th>
                <th>${getTranslatedSentence("Headloss")} [${resp["headloss_unit"]}]</th>
                <th>${getTranslatedSentence("Velocity")} [${resp["velocity_unit"]}]</th>
            </tr>
            ${internalTable}
        </table>
    `
}


// fetch data from api
function fetchData(url, formData, funcValidate, funcShowResp) {
    if (formButton.innerHTML != getTranslatedSentence("Calculate")) {
        // fetching data in progress
        return 0
    }
    if (!funcValidate(formData)) {
        // wrong form
        return 0
    }
    fetch(`${base_api_url}/${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(resp => funcShowResp(resp))
    .then(() => buttonEnable())
}


export { createChannelShapeForm, manningListeners };
export { createCalcModeForm, headlossListeners };

export { generateHeadlossFlowForm, generateHeadlossPowerForm };
export { getHeadlossFlowData, getHeadlossPowerData };
export { validateHeadlossFlowData, validateHeadlossPowerData };
export { headlossShowResponse };

export { generatePipesFlowForm, generatePipesPowerForm }
export { getPipesFlowData, getPipesPowerData }
export { validatePipesFlowData, validatePipesPowerData }
export { pipesShowResponse }