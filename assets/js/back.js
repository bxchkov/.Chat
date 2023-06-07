// Включаем socket.io и отслеживаем все подключения
let socket = io.connect();

let username = document.querySelector('.name__input'); // Поле с именем
let messageField = document.querySelector('.message-send__field'); // Текстовое поле
let allMessages = document.querySelector('.chat__messages'); // Блок сообщений


// Отслеживаем нажатие на кнопку в поле отправки сообщения
let sendButton = document.querySelector('.message-send__button');
document.addEventListener("click", e => {
    let sendButton = e.target.closest('.message-send__button');
    if (!sendButton) {
        return;
    }
    sendMessage();
})

// Enter в поле отправки сообщения
messageField.addEventListener("keyup", e=> {
    if (e.keyCode === 13) {
        sendMessage();
    }
});

const sendMessage = () => {
    if (messageField.value !== '' && sendButton.classList.contains('active')){
        // В сокет отсылаем новое событие 'send message',
        socket.emit('send message', {message: messageField.value, name: username.value});
        // Очищаем поле с сообщением
        messageField.value = '';
        sendButton.classList.remove('active');
    }
}

// Здесь отслеживаем событие 'add message',
// которое должно приходить из сокета в случае добавления нового сообщения
socket.on('add message', function (data) {
    // Встраиваем полученное сообщение в блок с сообщениями
    allMessages.insertAdjacentHTML('afterbegin',
        `<div class="message">
                <div class="message__username">
                    ${data.name}
                </div>
                    <div class="message__text">
                        ${data.message}
                    </div>
              </div>`
    );
});

