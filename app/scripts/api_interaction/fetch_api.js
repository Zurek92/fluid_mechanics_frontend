import { base_api_url } from '../config/config.js'
import { buttonDisable, buttonEnable } from '../forms/actions.js'
import { languageWord } from '../languages/language_options.js';

export function fetchData(url, formData, funcValidate, funcShowResp) {
    if (formButton.innerHTML != languageWord("Calculate")) {
        // fetching data in progress
        return 0
    }
    if (funcValidate(formData)) {
        // wrong form
        return 0
    }
    fetch(`${base_api_url}/${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(resp => funcShowResp(resp))
    .then(() => buttonEnable())
}
