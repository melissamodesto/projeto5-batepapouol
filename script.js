const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
promise.then(processResponse);

function processResponse(response) {
    let resposta = response.data;
    console.log(resposta);
}