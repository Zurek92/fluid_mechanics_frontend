import { languageDictionary } from '../languages/dictionary.js';
import { languageWord } from '../languages/language_options.js';

export function getHeadlossFlowData() {
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


export function getHeadlossPowerData() {
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

export function getPipesFlowData() {
    return {
        "fluid": languageDictionary["fluidsArrays"]["eng"][fluid.selectedIndex],
        "temperature": parseInt(temperature.value, 10),
        "material": languageDictionary["materialsArrays"]["eng"][material.selectedIndex],
        "flow": parseFloat(flow.value.replace(',', '.')),
        "flow_unit": flow_unit.value,
        "roughness": parseFloat(roughness.value.replace(',', '.')),
    }
}


export function getPipesPowerData() {
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
