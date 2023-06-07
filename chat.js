// Подключение всех модулей к программе
let express = require('express');
let app = express();
let chat = require('http').createServer(app);
const io = require('socket.io')(chat);

// Отслеживание порта
chat.listen(3000);

// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
    // Добавление всей директории на сервер
    app.use(express.static(__dirname));
});

// Функция, которая сработает при подключении к странице
io.sockets.on('connection', function (socket) {
    console.log("Подключение");

    // Функция, которая срабатывает при отключении от сервера
    socket.on('disconnect', function () {
        console.log("Отключение");
    });

    // Функция получающая сообщение от какого-либо пользователя
    socket.on('send message', function (data) {
        // Внутри функции мы передаем событие 'add msg',
        // которое будет вызвано у всех пользователей и у них добавиться новое сообщение
        io.sockets.emit('add message', {message: data.message, name: data.name});
    });

});


