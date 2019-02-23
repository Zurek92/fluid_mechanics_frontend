function getHeadlossFlowData() {
    return {
        "fluid": fluid.value,
        "temperature": parseInt(temperature.value, 10),
        "nominal_diameter": parseInt(nominal_diameter.value, 10),
        "material": material.value,
        "flow": parseFloat(flow.value),
        "flow_unit": flow_unit.value,
        "length": parseFloat(pipe_length.value),
        "roughness": parseFloat(roughness.value),
        "local_loss_coefficient": parseFloat(local_loss_coefficient.value),
        "headloss_unit": headloss_unit.value
    }
}

function getHeadlossPowerData() {
    return {
        "fluid": fluid.value,
        "temperature_supply": parseInt(temperature_supply.value, 10),
        "temperature_return": parseInt(temperature_return.value, 10),
        "nominal_diameter": parseInt(nominal_diameter.value, 10),
        "material": material.value,
        "power": parseFloat(power.value),
        "power_unit": power_unit.value,
        "length": parseFloat(pipe_length.value),
        "roughness": parseFloat(roughness.value),
        "local_loss_coefficient": parseFloat(local_loss_coefficient.value),
        "headloss_unit": headloss_unit.value
    }
}


function fetchData(url, formData) {
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
        console.log(resp);
    })
}
