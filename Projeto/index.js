function validateEmailField(){
    toggleDisableButtons();
    toggleEmailErros();
}

function validatePasswordField(){
    toggleDisableButtons();
    togglePasswordErros();
}

function isEmailValid(){
    const email = form.email().value
    if (!email){
        return false;
    }
    return validateEmail(email);
}

//Funções para Validar Senha --------------
function isPasswordValid(){
    const password = form.password().value;
    if(!password){
        return false;
    }
    return true;
}

function toggleEmailErros(){
    const email = form.email().value
    //ternários
    form.email_required().style.display = email ? "none" : "block";
    form.invalid_email().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErros(){
    const password = form.password().value;
    form.password_required().style.display = password ? "none" : "block";
}

function toggleDisableButtons(){
    const validEmail = isEmailValid();
    document.getElementById('recsenha_bt').disabled = !validEmail

    const validPassword = isPasswordValid();
    document.getElementById('entrar_bt').disabled = !validEmail || !validPassword;
}

const form = {
    email: () => document.getElementById("email"),
    email_required: () => document.getElementById("email_required"),
    invalid_email: () => document.getElementById("invalid_email"),
    login_bt: () => document.getElementById("entrar_bt"),
    password: () => document.getElementById("password"),
    password_required: () => document.getElementById("password_required"),
    registro_bt: () => document.getElementById("registro_bt"),
    recsenha_bt: () => document.getElementById("recsenha_bt")
}

function login(){
    window.location.href = "pages/home/home.html";
}

function registrar(){
    window.location.href = "pages/register/registrar.html"
}