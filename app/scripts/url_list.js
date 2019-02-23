url_elements = {
    'health': 'health page',
    'headloss.html': 'headloss page',
}

let urls = "";
for (elem in url_elements) {
    urls += `<a href="${base_frontend_url}/${elem}">${url_elements[elem]}</a>`
}
console.log(urls);
url_list.innerHTML = urls;
