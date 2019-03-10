import { languageWord } from '../languages/language_options.js';

function validateIntBetween(intValue, intMin, intMax, msgKey, elem) {
    if (Number.isInteger(intValue) && intValue >= intMin && intValue <= intMax) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = languageWord(msgKey);
    return 0
}

function validateFloatNonNegative(floatValue, msgKey, elem) {
    if (!isNaN(floatValue) && floatValue >= 0) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = languageWord(msgKey);
    return 0
}

function validateFloatPositive(floatValue, msgKey, elem, valueMax=Infinity) {
    if (!isNaN(floatValue) && floatValue > 0 && floatValue <= valueMax) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = languageWord(msgKey);
    return 0
}

function compareTemperatureValues(temperatureSupply, temperatureReturn, msgKey, elem) {
    if (temperatureSupply != temperatureReturn) {
        elem.innerHTML = "";
        return 1
    }
    elem.innerHTML = languageWord(msgKey);
    return 0
}

export function validateHeadlossFlowData(formData) {
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

export function validateHeadlossPowerData(formData) {
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


export function validatePipesFlowData(formData) {
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

export function validatePipesPowerData(formData) {
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
    elem.innerHTML = languageWord(msgKey);
    return 0
}

export function validateManningData(formData) {
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
