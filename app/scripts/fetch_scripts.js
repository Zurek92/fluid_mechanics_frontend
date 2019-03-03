// general config
const base_api_url = 'http://localhost:12000'

// prepare forms
const nominalDiameterArray = [8, 10, 15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150]
const flowUnitArray = [
    'l/s', 'l/m', 'l/h', 'mm3/s', 'mm3/m', 'mm3/h', 'cm3/s', 'cm3/m', 'cm3/h', 'dm3/s', 'dm3/m', 'dm3/h', 'm3/s', 
    'm3/m', 'm3/h', 'gal/s', 'gal/m', 'gal/h'
]
const headlossUnitArray = ['atm', 'Pa', 'kPa', 'mbar', 'bar', 'mmHg']
const powerUnitArray = ['W', 'kW', 'kcal/h']

function generateSelectOption(idElement, label, optionsArray) {
    let selectOptions = '';
    for (option of optionsArray) {
        selectOptions += `<option>${option}</option>`;
    };
    const translatedLabel = getTranslatedSentence(label);
    let formElement = `
        <span class="formInputTitle">${translatedLabel}:</span>
        <select id="${idElement}">
            <optgroup label="${translatedLabel}">
            ${selectOptions}
        </select>
    `
    return formElement;
}

function generateInputOption(idElement, label, defaultValue) {
    const translatedLabel = getTranslatedSentence(label);
    return `
    <span class="formInputTitle">${translatedLabel}:</span>
    <input id="${idElement}" placeholder="${translatedLabel}" value="${defaultValue}">
    `
}

function generateHeadlossFlowForm() {
    return `
        ${generateSelectOption('fluid', "Fluid", getTranslatedSentence("fluidsArrays"))}
        ${generateInputOption('temperature', "Temperature", "")}
        <div id="errorTemperature" class="errorMessage"></div>
        ${generateSelectOption('material', "Material", getTranslatedSentence("materialsArrays"))}
        ${generateSelectOption('nominal_diameter', "NominalDiameter", nominalDiameterArray)}
        ${generateInputOption('flow', "Flow", "")}
        <div id="errorFlow" class="errorMessage"></div>
        ${generateSelectOption('flow_unit', "FlowUnit", flowUnitArray)}
        ${generateInputOption('pipe_length', "PipeLength", "")}
        <div id="errorPipeLength" class="errorMessage"></div>
        ${generateInputOption('roughness', "Roughness", "1.5")}
        <div id="errorRoughness" class="errorMessage"></div>
        ${generateInputOption('local_loss_coefficient', "LocalLossCoefficient", "0")}
        <div id="errorLLC" class="errorMessage"></div>
        ${generateSelectOption('headloss_unit', "HeadlossUnit", headlossUnitArray)}
        <button type="button" id="formButton">${getTranslatedSentence("Calculate")}</button>
    `
}

function generateHeadlossPowerForm() {
    return `
        ${generateSelectOption('fluid', "Fluid", getTranslatedSentence("fluidsArrays"))}
        ${generateInputOption('temperature_supply', "TemperatureSupply", "")}
        <div id="errorTemperatureSupply" class="errorMessage"></div>
        ${generateInputOption('temperature_return', "TemperatureReturn", "")}
        <div id="errorTemperatureReturn" class="errorMessage"></div>
        ${generateSelectOption('material', "Material", getTranslatedSentence("materialsArrays"))}
        ${generateSelectOption('nominal_diameter', "NominalDiameter", nominalDiameterArray)}
        ${generateInputOption('power', "Power", "")}
        <div id="errorPower" class="errorMessage"></div>
        ${generateSelectOption('power_unit', "PowerUnit", powerUnitArray)}
        ${generateInputOption('pipe_length', "PipeLength", "")}
        <div id="errorPipeLength" class="errorMessage"></div>
        ${generateInputOption('roughness', "Roughness", "1.5")}
        <div id="errorRoughness" class="errorMessage"></div>
        ${generateInputOption('local_loss_coefficient', "LocalLossCoefficient", "0")}
        <div id="errorLLC" class="errorMessage"></div>
        ${generateSelectOption('headloss_unit', "HeadlossUnit", headlossUnitArray)}
        <button type="button" id="formButton">${getTranslatedSentence("Calculate")}</button>
    `
}

function buttonDisable() {
    formButton.innerHTML = getTranslatedSentence("Waiting");
}

function buttonEnable() {
    formButton.innerHTML = getTranslatedSentence("Calculate");
}

function createCalcModeForm() {
    calcMode.innerHTML = `
    <option value="" hidden>${getTranslatedSentence("ChooseMode")}</option>
    <option>${getTranslatedSentence("KnownFlow")}</option>
    <option>${getTranslatedSentence("KnownPower")}</option>
    `
    calcMode.value = "";
}

// listeners
function headlossListeners(url, flowFormFunc, powerFormFunc, flowData, powerData, validateFlow, validatePower) {
    calcMode.addEventListener("change", () => {
        if (calcMode.value == getTranslatedSentence("KnownFlow")) {
            optionsForm.innerHTML = flowFormFunc();
            document.querySelector("form > button").addEventListener("click", () => {
                fetchData(url, flowData(), validateFlow)
            });
        } else if (calcMode.value == getTranslatedSentence("KnownPower")) {
            optionsForm.innerHTML = powerFormFunc();
            document.querySelector("form > button").addEventListener("click", () => {
                fetchData(url, powerData(), validatePower)
            });
        }
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



// fetch data from api
function fetchData(url, formData, funcValidate) {
    if (formButton.innerHTML != getTranslatedSentence("Calculate")) {
        // fetching data in progress
        return 0
    }
    if (!funcValidate(formData)) {
        // wrong form
        return 0
    }
    buttonDisable();
    fetch(`${base_api_url}/${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(resp => {
        results.innerHTML += `<div>
        ${getTranslatedSentence("Headloss")}: ${resp['headloss']}${resp['headloss_unit']}, 
        ${getTranslatedSentence("Velocity")}: ${resp['velocity']}${resp['velocity_unit']}
        </div>
        `;
    })
    .then(() => buttonEnable())
}
