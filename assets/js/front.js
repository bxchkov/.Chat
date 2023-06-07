// TODO: КОСТЫЛИ ДИЧАЙШИЕ - ФИКСАНУТЬ ВСЁ
let chatHeight = document.querySelector('.chat__messages');
let chatHeaderHeight = document.querySelector('.chat__header').offsetHeight;
let messageFieldHeight = document.querySelector('.message-input').offsetHeight;
let headerHeight = document.querySelector('.header').offsetHeight;
window.addEventListener('resize', () => {
    resizer();
});
const resizer = () => {
    document.body.style.height = window.innerHeight;
    chatHeight.style.height = window.innerHeight - headerHeight - messageFieldHeight - chatHeaderHeight - 55;
}
resizer();

// Вывод (сохранённого) имени
let savedName = localStorage.name;
let yourName = document.querySelector('.chat__title span');
yourName.textContent = savedName;
const name = () => {
    let loginInput = document.querySelector('.name__input');
    if (loginInput.value !== '') {
        yourName.textContent = loginInput.value;
        localStorage.name = loginInput.value;
    }
}

// Вкл/Выкл формы логина в зависимости от наличия сохранённого имени
let loginForm = document.querySelector('.registration');
if (savedName){
    name();
}
else {
    loginForm.classList.add('active');
}

// Проверка вводимых в форму логина данных
let loginInput = document.querySelector('.name__input');
const loginValidation = () =>{
    const loginLength = loginInput.value.length >= 2;
    const loginChars = !/[^A-Za-zА-я]/.test(loginInput.value);
    let loginButton = document.querySelector('.name__confirm-button');
    if (loginLength && loginChars)
        loginButton.classList.add("active");
    else
        loginButton.classList.remove("active");
}

if (savedName){ // Если в localStorage уже сохранено имя, подставляем в инпут
    loginInput.value = savedName;
    loginValidation()
}

document.addEventListener("input", e => {
    // if (!loginInput)
    //     return;
    loginValidation();
})

// Toggle формы логина
const loginFormToggle = () => {
    let loginForm = document.querySelector('.registration');
    if (!loginForm.classList.contains('active')) {
        loginForm.classList.add('active');
    } else {
        loginForm.classList.remove('active');
    }
}

// Активность кнопки логина
document.addEventListener("click", e => {
    let btn = e.target.closest('.name__confirm-button');
    if (!btn)
        return;
    if (btn.classList.contains('active')) {
        loginFormToggle();
        name();
    }
})

// Кнопка изменения имени
document.addEventListener("click", e => {
    let changeNameButton = e.target.closest('.header__name-change');
    if (!changeNameButton)
        return
    loginFormToggle();
})

// Кнопка отправки сообщения
let messageInput = document.querySelector('.message-send__field');
document.addEventListener("input", e=> {
    let sendButton = document.querySelector('.message-send__button');
    if (!sendButton)
        return;
    if (messageInput.value !== '')
        sendButton.classList.add('active');
    else
        sendButton.classList.remove('active');
})

