import { manningListeners } from '../forms/actions.js'
import { generateSelectOption } from '../forms/forms.js'
import { languageWord } from '../languages/language_options.js';

const optionsArray = [
    languageWord("channelCircular"),
    languageWord("channelRectangular")
]

shapeMode.innerHTML = generateSelectOption('', "ChooseShape", optionsArray, "ChooseShape");

manningListeners();
