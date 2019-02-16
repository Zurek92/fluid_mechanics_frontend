const base_url = 'http://127.0.0.1:12000'

box.addEventListener(
    'click', () => {
        fetch(`${base_url}/health`)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
        })
    }
)

const myF = (a, b) => {
    console.log(a, b);
}
