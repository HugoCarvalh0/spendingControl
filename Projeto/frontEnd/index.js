firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html";
    }
});

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

function isPasswordValid(){
    const password = form.password().value;
    if(!password){
        return false;
    }
    return true;
}

function toggleEmailErros(){
    const email = form.email().value

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

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential"){
        return "Email ou senha inválidos";
    }
    if (error.code == "auth/invalid-value-(email),-starting-an-object-on-a-scalar-field"){
        return "Email inválido"
    }
    return error.message;
}

function login(){
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value)
    .then(response =>{
        hideLoading();
        window.location.href = "pages/home/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function recuperarSenha(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(document.getElementById("email").value).then(() => {
        hideLoading();
        alert("Email enviado com sucesso");
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function registrar(){
    window.location.href = "pages/register/registrar.html"
}

