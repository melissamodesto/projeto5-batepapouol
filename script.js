let participants;
let message = [];

searchMessager();

//Carregar mensagens da API e renderizar na tela
function searchMessager() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(processMessager);
}

function processMessager(response) {
    message = response.data;
    console.log(message);
    renderMessage();
}

function renderMessage() {
    const container = document.querySelector('.container');
    
    
    for (let i = 0; i < message.length; i++) {
        
        const from = message[i].from;
        const text = message[i].text;
        const time = message[i].time;
        const to = message[i].to;
        const type = message[i].type;

        if (type === 'status') {
            let messagerTemplate = '';

            messagerTemplate = ` 
            <div class="enter">
                <div class="status">
                    <p>(${time})<strong> ${from}</strong> ${text}</p>
                </div>
            </div>`;
            container.innerHTML += messagerTemplate;
        }

        if (type === 'private_message') {
            
            let messagerTemplate = '';

            messagerTemplate = ` 
            <div class="enter">
                <div class="private-message">
                    <p>(${time})<strong> ${from}</strong> para <strong>${to}</strong>: ${text}</p>
                </div>
            </div>`;
            container.innerHTML += messagerTemplate;
        }
        
        if (type === 'message') {
            
            let messagerTemplate = '';
            
            messagerTemplate = ` 
            <div class="enter">
                <div class="message">
                    <p>(${time})<strong> ${from}</strong> para <strong>${to}</strong>: ${text}</p>
                    </div>
            </div>`;
            container.innerHTML += messagerTemplate;
        }
    }
    
    container.scrollIntoView({block: 'end'});
}

//Entrar no bate-papo com o usuário
let user = {};

function choiceUserName() {
    const userName = prompt('Digite seu nome:');

    if (userName === undefined || userName === null) {
        choiceUserName();
    } else {
        user.name = userName

        axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
        /* promise.catch(processError); */
    }
}

choiceUserName();


function sendMessage() {
    const message = document.querySelector('input').value;
    const userObj = {
        text: message,
        to: 'Todos',
        from: user.name,
        type: 'message',
    }

    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', userObj)
        .then(function (response) {
            searchMessager();
        })
        .then(function () {
            document.querySelector('input').value = '';
        });
    /* promise.catch(processError); */
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