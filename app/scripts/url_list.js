import { languageWord, userLanguage } from './languages/language_options.js';
import { languageDictionary } from './languages/dictionary.js';

const url_elements = {
    'headloss.html': languageDictionary["URLHeadlossPageDescr"][userLanguage],
    'pipes.html': languageDictionary["URLPipesPageDescr"][userLanguage],
    'manning.html': languageDictionary["URLManningPageDescr"][userLanguage],
}

let urls = "";
for (let elem in url_elements) {
    urls += `<a href="/${elem}">${url_elements[elem]}</a>`
}
url_list.innerHTML = urls;
