document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let submit = document.querySelector(".authorization__wrapper-button");
        let loginInput = document.querySelector(".authorization__wrapper-login input");
        let passwordInput = document.querySelector(".authorization__wrapper-password input");
        let textMessage = document.querySelector(".authorization__wrapper-text");
        let textSuccess = document.querySelector(".authorization__wrapper-text-success");
        submit.disabled = true;
        loginInput.disabled = true;
        passwordInput.disabled = true;
        textMessage.textContent = "Загрузка";
        
        let login = loginInput.value;
        let password =  passwordInput.value;

        fetch('https://test-works.pr-uni.ru/api/login/index.php?' + new URLSearchParams({
            login: login,
            password: password,
        }), {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(responce => responce.json())
        .then(data => {
            if (data.token) {
                document.cookie = `token=${data.token}`;
                loginInput.classList.remove("authorization__wrapper-input_red");
                passwordInput.classList.remove("authorization__wrapper-input_red");
                textMessage.classList.remove("authorization__wrapper-text-red");
                loginInput.classList.add("authorization__wrapper-input_green");
                passwordInput.classList.add("authorization__wrapper-input_green");
                form.classList.add("authorization__wrapper-form-hide");
                textSuccess.textContent = `${data.user.name}, Вы успешно авторизованы!`;
            } else {
                textMessage.textContent = data.errorMessage;
                loginInput.classList.add("authorization__wrapper-input_red");
                passwordInput.classList.add("authorization__wrapper-input_red");
                textMessage.classList.add("authorization__wrapper-text-red");
            }
        })
        .catch(error => {
            textMessage.textContent = error;
            loginInput.classList.add("authorization__wrapper-input_red");
            passwordInput.classList.add("authorization__wrapper-input_red");
            textMessage.classList.add("authorization__wrapper-text-red");
            console.error("Ошибка: ", error);
        })
        .finally(() => {
            form.reset();
            submit.disabled = false;
            loginInput.disabled = false;
            passwordInput.disabled = false;
        });
    })
});