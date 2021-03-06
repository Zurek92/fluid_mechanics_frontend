import { languageWord } from '../languages/language_options.js';

const nominalDiameterArray = [8, 10, 15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150]
const flowUnitArray = [
    'l/s',
    'l/m',
    'l/h',
    'mm3/s',
    'mm3/m',
    'mm3/h',
    'cm3/s',
    'cm3/m',
    'cm3/h',
    'dm3/s',
    'dm3/m',
    'dm3/h',
    'm3/s',
    'm3/m',
    'm3/h',
    'gal/s',
    'gal/m',
    'gal/h'
]
const headlossUnitArray = ['atm', 'Pa', 'kPa', 'mbar', 'bar', 'mmHg']
const powerUnitArray = ['W', 'kW', 'kcal/h']
const slopeUnitArray = ['-', '%', '&permil;']

export function generateSelectOption(idElement, label, optionsArray, initHidden=null) {
    let selectOptions = [];
    if (initHidden) {
        selectOptions.push(`<option value="" hidden>${languageWord(initHidden)}</option>`)
    }
    for (let option of optionsArray) {
        selectOptions.push(`<option>${option}</option>`);
    };
    const translatedLabel = languageWord(label);
    let formElement = `
        <span class="formInputTitle">${translatedLabel}:</span>
        <select id="${idElement}">
            <optgroup label="${translatedLabel}">
            ${selectOptions.join('\n')}
        </select>
    `
    return formElement;
}

function generateInputOption(idElement, label, defaultValue) {
    const translatedLabel = languageWord(label);
    return `
    <span class="formInputTitle">${translatedLabel}:</span>
    <input id="${idElement}" placeholder="${translatedLabel}" value="${defaultValue}">
    `
}

function headlossTemplate(temperatureFields, calculateMode) {
    return `
        ${generateSelectOption('fluid', "Fluid", languageWord("fluidsArrays"))}
        ${temperatureFields}
        ${generateSelectOption('material', "Material", languageWord("materialsArrays"))}
        ${generateSelectOption('nominal_diameter', "NominalDiameter", nominalDiameterArray)}
        ${calculateMode}
        ${generateInputOption('pipe_length', "PipeLength", "")}
        <div id="errorPipeLength" class="errorMessage"></div>
        ${generateInputOption('roughness', "Roughness", "1.5")}
        <div id="errorRoughness" class="errorMessage"></div>
        ${generateInputOption('local_loss_coefficient', "LocalLossCoefficient", "0")}
        <div id="errorLLC" class="errorMessage"></div>
        ${generateSelectOption('headloss_unit', "HeadlossUnit", headlossUnitArray)}
        <button type="button" id="formButton">${languageWord("Calculate")}</button>
    ` 
}

function pipesTemplate(temperatureFields, calculateMode) {
    return `
        ${generateSelectOption('fluid', "Fluid", languageWord("fluidsArrays"))}
        ${temperatureFields}
        ${generateSelectOption('material', "Material", languageWord("materialsArrays"))}
        ${calculateMode}
        ${generateInputOption('roughness', "Roughness", "1.5")}
        <div id="errorRoughness" class="errorMessage"></div>
        <button type="button" id="formButton">${languageWord("Calculate")}</button>
    `
}

export function generateHeadlossForm(mode, template) {
    let temperatureFields;
    let calculateMode;
    // flow or power
    if (mode == "flow") {
        temperatureFields = `
            ${generateInputOption('temperature', "Temperature", "")}
            <div id="errorTemperature" class="errorMessage"></div>
        `
        calculateMode = `
            ${generateInputOption('flow', "Flow", "")}
            <div id="errorFlow" class="errorMessage"></div>
            ${generateSelectOption('flow_unit', "FlowUnit", flowUnitArray)}
        `
    } else if (mode == "power") {
        temperatureFields = `
            ${generateInputOption('temperature_supply', "TemperatureSupply", "")}
            <div id="errorTemperatureSupply" class="errorMessage"></div>
            ${generateInputOption('temperature_return', "TemperatureReturn", "")}
            <div id="errorTemperatureReturn" class="errorMessage"></div>
        `
        calculateMode = `
            ${generateInputOption('power', "Power", "")}
            <div id="errorPower" class="errorMessage"></div>
            ${generateSelectOption('power_unit', "PowerUnit", powerUnitArray)}
        `
    }
    // template
    if (template == "headloss") {
        return headlossTemplate(temperatureFields, calculateMode);
    } else if (template == "pipes") {
        return pipesTemplate(temperatureFields, calculateMode);
    }
}

export function generateManningForm() {
    let linearDimension = "";
    if (shapeMode.value == languageWord("channelCircular")) {
        linearDimension = generateInputOption('channelDiameter', "Diameter", "");
    } else if (shapeMode.value == languageWord("channelRectangular")) {
        linearDimension = generateInputOption('channelWidth', "Width", "");
    }
    return `
        ${linearDimension}
        <div id="errorLinearDimension" class="errorMessage"></div>
        ${generateInputOption('channelHeight', "Height", "")}
        <div id="errorHeight" class="errorMessage"></div>
        ${generateInputOption('channelSlope', "Slope", "")}
        <div id="errorSlope" class="errorMessage"></div>
        ${generateSelectOption('slope_unit', "SlopeUnit", slopeUnitArray)}
        ${generateInputOption('manningCoefficient', "ManningCoefficient", 0.013)}
        <div id="errorManningCoefficient" class="errorMessage"></div>
        <button type="button" id="formButton">${languageWord("Calculate")}</button>
    `
}
