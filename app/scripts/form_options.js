const fluidsArray = ['water']
const materialArray = ['steel']
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
    let formElement = `
        <span class="formInputTitle">${label}:</span>
        <select id="${idElement}">
            <optgroup label="${label}">
            ${selectOptions}
        </select>
    `
    return formElement;
}

function generateInputOption(idElement, label, defaultValue) {
    return `
    <span class="formInputTitle">${label}:</span>
    <input id="${idElement}" placeholder="${label}" value="${defaultValue}">
    `
}

function generateHeadlossFlowForm() {
    return `
        ${generateSelectOption('fluid', 'Fluid', fluidsArray)}
        ${generateInputOption('temperature', 'Temperature', "")}
        ${generateSelectOption('material', 'Material', materialArray)}
        ${generateSelectOption('nominal_diameter', 'Nominal diameter', nominalDiameterArray)}
        ${generateInputOption('flow', 'Flow', "")}
        ${generateSelectOption('flow_unit', 'Flow unit', flowUnitArray)}
        ${generateInputOption('pipe_length', 'Pipe length [m]', "")}
        ${generateInputOption('roughness', 'Roughness', "1.5")}
        ${generateInputOption('local_loss_coefficient', 'Local loss coefficient', "0")}
        ${generateSelectOption('headloss_unit', 'Headloss unit', headlossUnitArray)}
        <button type="button">Calculate</button>
    `
}

function generateHeadlossPowerForm() {
    return `
        ${generateSelectOption('fluid', 'Fluid', fluidsArray)}
        ${generateInputOption('temperature_supply', 'Temperature supply', "")}
        ${generateInputOption('temperature_return', 'Temperature return', "")}
        ${generateSelectOption('material', 'Material', materialArray)}
        ${generateSelectOption('nominal_diameter', 'Nominal diameter', nominalDiameterArray)}
        ${generateInputOption('power', 'Power', "")}
        ${generateSelectOption('power_unit', 'Power unit', powerUnitArray)}
        ${generateInputOption('pipe_length', 'Pipe length [m]', "")}
        ${generateInputOption('roughness', 'Roughness', "1.5")}
        ${generateInputOption('local_loss_coefficient', 'Local loss coefficient', "0")}
        ${generateSelectOption('headloss_unit', 'Headloss unit', headlossUnitArray)}
        <button type="button">Calculate</button>
    `
}

calcMode.value = "";
