let participants;
let message;

searchMessager();
choiceUserName();

//Carregar mensagens da API e renderizar na tela
function searchMessager() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(processMessager);
}

function processMessager(response) {
    message = response.data;
    console.log(message);
    renderizarMensagem();
}

function renderizarMensagem() {
    const container = document.querySelector('.container');
    container.scrollIntoView(block = 'end', behavior = 'smooth');

    for (let i = 0; i < message.length; i++) {

        let messagerTemplate = '';
        
        messagerTemplate = ` 
        <div class="enter">
            <div class="status">
                <p>(${message[i].time})<strong> ${message[i].from}</strong> ${message[i].text}</p>
            </div>
        </div>`;
        container.innerHTML += messagerTemplate;

        if (message[i].type === 'message') {
            messager();
        }	

        if (message[i].type === 'private_message') {
            privateMessage();
        }	
    }
}

function messager() {
    const status = document.querySelector('.enter');
    status.classList.add('message');
    status.classList.remove('status');
}

function privateMessage() {
    const status = document.querySelector('.enter');
    status.classList.add('private-message');
}

//Entrar no bate-papo com o usuário
let name;

function choiceUserName() {
    const userName = prompt('Digite seu nome:');

    if (userName === undefined || userName === null) {
        choiceUserName();
    } else {
        user = {
            name: userName,
        }

        axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
        /* promise.catch(processError); */

    }
}

/* let error;

function processError() {

    error = erro.response.status;

    if (error === 400) {
        alert('Já existe usuário com este nome. Escolha outro nome.');
        choiceUserName();
    }

    if (error === 422) {
        alert('Preencha o campo');
        choiceUserName();
    }
} */