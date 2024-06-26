function onChangeEmail(){
    const email = form.email().value;
    form.email_required().style.display = email ? "none" : "block";
    form.invalid_email().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButton();
}

function onChangePassword(){
    const password = form.password().value;
    form.password_required().style.display = password ? "none" : "block";
    form.invalid_password().style.display = password.length >= 6 ? "none" : "block";
    validateConfPassMatch();
    toggleRegisterButton();
}

function onChangeConfPassword(){
    validateConfPassMatch();
    toggleRegisterButton();
}

function validateConfPassMatch(){
    const confPass = form.confPassword().value;
    const password = form.password().value;
    form.password_doesnt_match().style.display = confPass == password ? "none" : "block";
}

function toggleRegisterButton(){
    form.register_button().disabled = !isFormValid();
}

function isFormValid(){
    const email = form.email().value;
    if (!email || !validateEmail(email)){
        return false;
    }
    const password = form.password().value;
    if (!password || password.length < 6 ){
        return false;
    }
    const confPassword = form.confPassword().value;
    if (password != confPassword){
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById("email"),
    email_required: () => document.getElementById("email_required"),
    invalid_email: () => document.getElementById("invalid_email"),
    password: () => document.getElementById("password"),
    password_required: () => document.getElementById("password_required"),
    invalid_password: () => document.getElementById("invalid_password"),
    confPassword: () => document.getElementById("ConfPassword"),
    password_doesnt_match: () => document.getElementById("password_doesnt_match"),
    register_button: () => document.getElementById("register")
}