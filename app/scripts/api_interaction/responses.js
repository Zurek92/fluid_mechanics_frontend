import { languageWord } from '../languages/language_options.js';

export function headlossShowResponse(resp) {
    return results.innerHTML += `
        <div>
        ${languageWord("Headloss")}: ${resp['headloss']}${resp['headloss_unit']},
        ${languageWord("Velocity")}: ${resp['velocity']}${resp['velocity_unit']}
        </div>
    `
}

export function manningShowResponse(resp) {
    return results.innerHTML += `
        <div>
        ${languageWord("Flow")}: ${resp['flow']}${resp['flow_unit']},
        ${languageWord("Velocity")}: ${resp['velocity']}${resp['velocity_unit']}
        </div>
    `
}

export function pipesShowResponse(resp) {
    let internalTable = '';
    for (let diameterResult of resp["results"]) {
        internalTable += `
        <tr>
            <td>${diameterResult["nominal_diameter"]}</td>
            <td>${diameterResult["headloss"]}</td>
            <td>${diameterResult["velocity"]}</td>
        </tr>
        `
    }
    return results.innerHTML = `
        <table>
            <tr>
                <th>${languageWord("Diameter")}</th>
                <th>${languageWord("Headloss")} [${resp["headloss_unit"]}]</th>
                <th>${languageWord("Velocity")} [${resp["velocity_unit"]}]</th>
            </tr>
            ${internalTable}
        </table>
    `
}
