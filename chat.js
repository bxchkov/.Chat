// Подключение всех модулей к программе
let express = require('express');
let app = express();
let chat = require('http').createServer(app);
const io = require('socket.io')(chat);

// Отслеживание порта
chat.listen(3000);

// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
    // Добавление всей директории на сервер
    app.use(express.static(__dirname));
});


// Массив со всеми подключениями
connections = [];

// Функция, которая сработает при подключении к странице
// Считается как новый пользователь
io.sockets.on('connection', function(socket) {
    console.log("Подключение");
    // Добавление нового соединения в массив
    connections.push(socket);

    // Функция, которая срабатывает при отключении от сервера
    socket.on('disconnect', function(data) {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключение");
    });

    // Функция получающая сообщение от какого-либо пользователя
    socket.on('send msg', function(data) {
        // Внутри функции мы передаем событие 'add msg',
        // которое будет вызвано у всех пользователей и у них добавиться новое сообщение
        io.sockets.emit('add msg', {msg: data.msg, name: data.username});
    });

});