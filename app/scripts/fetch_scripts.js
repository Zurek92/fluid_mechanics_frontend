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


function fetchData(url, formData) {
    if (formButton.innerHTML != getTranslatedSentence("Calculate")) {
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
        results.innerHTML = `
        ${getTranslatedSentence("Headloss")}: ${resp['headloss']}${resp['headloss_unit']}, 
        ${getTranslatedSentence("Velocity")}: ${resp['velocity']}${resp['velocity_unit']}
        `;
    })
    .then(() => buttonEnable())
}
