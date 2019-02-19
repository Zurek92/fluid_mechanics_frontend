const url_internal = 'http://127.0.0.1:13000'

url_elements = {
    'health': 'health page',
    'headloss': 'headloss page',
}

let urls = "";
for (elem in url_elements) {
    urls += `<a href="${url_internal}/${elem}">${url_elements[elem]}</a>`
}
console.log(urls);
url_list.innerHTML = urls;
