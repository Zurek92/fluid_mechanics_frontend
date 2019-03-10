import { languageWord } from '../languages/language_options.js';

function validateNumber(
    elemId, value, valueMin, valueMax, minExclude=false, maxExclude=false, isInteger=false
) {
    if (isNaN(value)) {
        elemId.innerHTML = languageWord("validationNotNumberValue");
        return false;
    }
    if (minExclude ? value <= valueMin : value < valueMin) {
        elemId.innerHTML = languageWord("validationValueTooLow");
        return false;
    }
    if (maxExclude ? value >= valueMax : value > valueMax) {
        elemId.innerHTML = languageWord("validationValueTooHigh");
        return false;
    }
    if (isInteger && !Number.isInteger(value)) {
        elemId.innerHTML = languageWord("validationValueShouldBeInteger");
        return false;
    }
    elemId.innerHTML = "";
    return true
}

function compareValues(elemId, value1, value2, mode, msgKey) {
    if (isNaN(value1) || isNaN(value2)) {
        return false;
    }
    let compare;
    switch (mode) {
        case "equal":
            compare = value1 == value2;
            break;
        case "notEqual":
            compare = value1 != value2;
            break;
        case "greaterThan":
            compare = value1 > value2;
            break;
        case "lowerThan":
            compare = value1 < value2;
            break;
        case "greaterEqual":
            compare = value1 >= value2;
            break;
        case "lowerEqual":
            compare = value1 <= value2;
            break;
    }
    if (!compare) {
        elemId.innerHTML = languageWord(msgKey);
    }
    return compare;
}

export function validateHeadlossFlowData(formData) {
    return [
        validateNumber(errorTemperature, formData["temperature"], 0, 200, false, false, true),
        validateNumber(errorFlow, formData["flow"], 0, Infinity, false, false, false),
        validateNumber(errorRoughness, formData["roughness"], 0, 3, true, false, false),
        validateNumber(errorPipeLength, formData["length"], 0, Infinity, true, false, false),
        validateNumber(errorLLC, formData["local_loss_coefficient"], 0, Infinity, false, false, false),
    ].includes(false)
}

export function validateHeadlossPowerData(formData) {
    return [
        validateNumber(errorTemperatureSupply, formData["temperature_supply"], 0, 200, false, false, true),
        validateNumber(errorTemperatureReturn, formData["temperature_return"], 0, 200, false, false, true),
        compareValues(
            errorTemperatureReturn,
            formData["temperature_supply"],
            formData["temperature_return"],
            "notEqual",
            "wrongTemperatureCompare"
        ),
        validateNumber(errorPower, formData["power"], 0, Infinity, false, false, false),
        validateNumber(errorRoughness, formData["roughness"], 0, 3, true, false, false),
        validateNumber(errorPipeLength, formData["length"], 0, Infinity, true, false, false),
        validateNumber(errorLLC, formData["local_loss_coefficient"], 0, Infinity, false, false, false),
    ].includes(false)
}

export function validatePipesFlowData(formData) {
    return [
        validateNumber(errorTemperature, formData["temperature"], 0, 200, false, false, true),
        validateNumber(errorFlow, formData["flow"], 0, Infinity, false, false, false),
        validateNumber(errorRoughness, formData["roughness"], 0, 3, true, false, false),
    ].includes(false)
}

export function validatePipesPowerData(formData) {
    return [
        validateNumber(errorTemperatureSupply, formData["temperature_supply"], 0, 200, false, false, true),
        validateNumber(errorTemperatureReturn, formData["temperature_return"], 0, 200, false, false, true),
        compareValues(
            errorTemperatureReturn,
            formData["temperature_supply"],
            formData["temperature_return"],
            "notEqual",
            "wrongTemperatureCompare"
        ),
        validateNumber(errorPower, formData["power"], 0, Infinity, false, false, false),
        validateNumber(errorRoughness, formData["roughness"], 0, 3, true, false, false),
    ].includes(false)
}

export function validateManningData(formData) {
    const validationArray = [
        validateNumber(errorHeight, formData["height"], 0, Infinity, false, false, false),
        validateNumber(errorSlope, formData["slope"], 0, Infinity, false, false, false),
        validateNumber(errorManningCoefficient, formData["manning_coefficient"], 0, Infinity, true, false, false),
    ]
    if ("width" in formData) {
        validationArray.push(validateNumber(errorLinearDimension, formData["width"], 0, Infinity, true, false, false))
    } else if ("diameter" in formData) {
        validationArray.push(
            validateNumber(errorLinearDimension, formData["diameter"], 0, Infinity, true, false, false),
            compareValues(
                errorHeight,
                formData["diameter"],
                formData["height"],
                "greaterEqual",
                "wrongHeightCompare"
            ),
        )
    }
    return validationArray.includes(false)
}
