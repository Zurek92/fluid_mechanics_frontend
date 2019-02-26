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
        ${generateSelectOption('material', "Material", getTranslatedSentence("materialsArrays"))}
        ${generateSelectOption('nominal_diameter', "NominalDiameter", nominalDiameterArray)}
        ${generateInputOption('flow', "Flow", "")}
        ${generateSelectOption('flow_unit', "FlowUnit", flowUnitArray)}
        ${generateInputOption('pipe_length', "PipeLength", "")}
        ${generateInputOption('roughness', "Roughness", "1.5")}
        ${generateInputOption('local_loss_coefficient', "LocalLossCoefficient", "0")}
        ${generateSelectOption('headloss_unit', "HeadlossUnit", headlossUnitArray)}
        <button type="button" id="formButton">${getTranslatedSentence("Calculate")}</button>
    `
}

function generateHeadlossPowerForm() {
    return `
        ${generateSelectOption('fluid', "Fluid", getTranslatedSentence("fluidsArrays"))}
        ${generateInputOption('temperature_supply', "TemperatureSupply", "")}
        ${generateInputOption('temperature_return', "TemperatureReturn", "")}
        ${generateSelectOption('material', "Material", getTranslatedSentence("materialsArrays"))}
        ${generateSelectOption('nominal_diameter', "NominalDiameter", nominalDiameterArray)}
        ${generateInputOption('power', "Power", "")}
        ${generateSelectOption('power_unit', "PowerUnit", powerUnitArray)}
        ${generateInputOption('pipe_length', "PipeLength", "")}
        ${generateInputOption('roughness', "Roughness", "1.5")}
        ${generateInputOption('local_loss_coefficient', "LocalLossCoefficient", "0")}
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

