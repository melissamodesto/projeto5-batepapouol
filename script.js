let participants;
let message = [];

searchMessage();

//Carregar mensagens da API e renderizar na tela
function searchMessage() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(processMessage);
}

function processMessage(response) {
    message = response.data;
    renderMessage();
}

function renderMessage() {

    const container = document.querySelector('.container');

    container.innerHTML = "";

    for (let i = 0; i < message.length; i++) {

        const from = message[i].from;
        const text = message[i].text;
        const time = message[i].time;
        const to = message[i].to;
        const type = message[i].type;

        if (type === 'status') {

            let messageTemplate = '';

            messageTemplate = ` 
            <div class="enter">
                <div class="status">
                    <p>(${time})<strong> ${from}</strong> ${text}</p>
                </div>
            </div>`;
            container.innerHTML += messageTemplate;
        }

        if (type === 'private_message') {

            let messageTemplate = '';

            messageTemplate = ` 
            <div class="enter">
                <div class="private-message">
                    <p>(${time})<strong> ${from}</strong> para <strong>${to}</strong>: ${text}</p>
                </div>
            </div>`;
            container.innerHTML += messageTemplate;
        }

        if (type === 'message') {

            let messageTemplate = '';

            messageTemplate = ` 
            <div class="enter">
                <div class="message">
                    <p>(${time})<strong> ${from}</strong> para <strong>${to}</strong>: ${text}</p>
                </div>
            </div>`;
            container.innerHTML += messageTemplate;
        }
    }

    /* container.scrollIntoView({ inline: 'nearest', block: 'end', behavior: 'smooth' }); */
    window.scrollTo(0, container.scrollHeight);
}

setInterval(searchMessage, 3000);

//Entrar no bate-papo com o usuário
let login;
let user = {
    name: '',
};

function choiceUserName() {
    /* const userName = prompt('Digite seu nome:'); */

    login = document.querySelector('.login');

    let userName = document.querySelector('input').value;

    if (userName === undefined || userName === null || userName === '') {
        alert('Preencha o campo');
        reload();
    } else {
        const input = document.querySelector('input');
        const button = document.querySelector('button');
        
        input.classList.add('hidden');
        button.classList.add('hidden');
        
        const load = document.querySelector('.load');
        load.classList.remove('hidden');

        user.name = userName;
        

        setTimeout(showMessage(), 5000);

        axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
            .then(function (response) {
                setInterval(keepConnected, 5000, user); //Keep connected function
            })
            .catch(processError); //Se der erro, chama a função processError
    }
}

function showMessage() {
    login = document.querySelector('.login');
    login.classList.add('hidden');
}

/* choiceUserName(); */

function keepConnected(response) {
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user)
        .catch(disconnected);
}

function sendMessage() {
    const message = document.querySelector('.message-user').value;
    const userObj = {
        text: message,
        to: 'Todos',
        from: user.name,
        type: 'message',
    }

    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', userObj)
        .then(function (response) {
            searchMessage();
        })
        .then(function () {
            document.querySelector('.message-user').value = '';
        });
    /* promise.catch(processError); */
}

function reload() {
    window.location.reload();
}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage()
    }
})

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        choiceUserName()
    }
})

let error;

function processError() {

    error = erro.response.status;

    if (error === '409') {
        alert('Já existe usuário com este nome. Escolha outro nome.');
        choiceUserName();
    }

    if (error === '422') {
        alert('Preencha o campo');
        choiceUserName();
    }
}

function disconnected() {
    alert("Sua sessão expirou. Por favor, entre novamente.");
    window.location.reload();
}