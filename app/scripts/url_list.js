url_elements = {
    'headloss.html': languageDictionary["URLHeadlossPageDescr"][userLanguage],
    'pipes.html': languageDictionary["URLPipesPageDescr"][userLanguage],
}

let urls = "";
for (elem in url_elements) {
    urls += `<a href="/${elem}">${url_elements[elem]}</a>`
}
url_list.innerHTML = urls;
