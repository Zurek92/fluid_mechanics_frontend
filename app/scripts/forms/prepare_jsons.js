import { languageDictionary } from '../languages/dictionary.js';
import { languageWord } from '../languages/language_options.js';

function specifiedPowerValues() {
    return {
        "temperature_supply": parseInt(temperature_supply.value, 10),
        "temperature_return": parseInt(temperature_return.value, 10),
        "power": parseFloat(power.value.replace(',', '.')),
        "power_unit": power_unit.value,
    }
}

function specifiedFlowValues() {
    return {
        "temperature": parseInt(temperature.value, 10),
        "flow": parseFloat(flow.value.replace(',', '.')),
        "flow_unit": flow_unit.value,
    }
}

function specifiedMaterial(diameterExtend=false) {
    const materialParams = {
        "material": languageDictionary["materialsArrays"]["eng"][material.selectedIndex],
        "roughness": parseFloat(roughness.value.replace(',', '.')),
    }
    if (diameterExtend) {
        materialParams["nominal_diameter"] = parseInt(nominal_diameter.value, 10);
    }
    return materialParams;
}

function specifiedPipeSystem() {
    return {
        "length": parseFloat(pipe_length.value.replace(',', '.')),
        "local_loss_coefficient": parseFloat(local_loss_coefficient.value.replace(',', '.')),
    }
}

function specifiedHeadlossUnitValue() {
    return {
        "headloss_unit": headloss_unit.value,
    }
}

function specifiedFluid() {
    return {
        "fluid": languageDictionary["fluidsArrays"]["eng"][fluid.selectedIndex],
    }
}

export function getHeadlossData(flowMode, formMode) {
    const fluidParams = {
        ...specifiedFluid(),
    }
    let materialParams;
    switch(formMode) {
        case "headloss":
            materialParams = {
                ...specifiedMaterial(true),
                ...specifiedPipeSystem(),
                ...specifiedHeadlossUnitValue(),
            }
            break;
        case "pipes":
            materialParams = {
                ...specifiedFluid(),
                ...specifiedMaterial(false)
            }
            break;
    }
    switch(flowMode) {
        case "flow":
            return {
                ...fluidParams,
                ...materialParams,
                ...specifiedFlowValues()
            };
        case "power":
            return {
                ...fluidParams,
                ...materialParams,
                ...specifiedPowerValues()
            };
    }
}

export function getManningData() {
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
