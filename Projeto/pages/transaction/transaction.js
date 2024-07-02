const form = {
    entrada: () => document.getElementById("entrada"),
    date: () => document.getElementById("date"),
    date_required: () => document.getElementById("date_required"),
    currency: () => document.getElementById("currency"),
    value: () => document.getElementById("value"),
    value_required: () => document.getElementById("value_required"),
    negative_value: () => document.getElementById("negative_value"),
    type: () => document.getElementById("type"),
    type_required: () => document.getElementById("type_required"),
    description: () => document.getElementById("description"),
    saveButton: () => document.getElementById("saveButton")
}

function onChangeDate(){
    const date = form.date().value;
    form.date_required().style.display = date ? "none" : "block";

    toggleSaveButton()
}

function onChangeValue(){
    const value = form.value().value;
    form.value_required().style.display = value ? "none" : "block";
    form.negative_value().style.display = value <= 0 ? "block" : "none";

    toggleSaveButton()
}

function onChangeType(){
    const type = form.type().value;
    form.type_required().style.display = !type ? "block" : "none";

    toggleSaveButton()
}   

function toggleSaveButton(){
    form.saveButton().disabled = !isFormValid();
}

function isFormValid(){
    const date = form.date().value;
    const value = form.value().value;
    const type = form.type().value;

    if (!date || !value || value <=0 || !type){
        return false
    }

    return true;
}

function saveTransaction(){
    showLoading();

    const transaction = createTransaction();

    firebase.firestore().collection('transactions').add(transaction).then(() => {
        hideLoading();
        window.location.href = "../home/home.html"
    }).catch(() => {
        hideLoading();
        alert("Erro ao salvar transação")
    }) 

}

function createTransaction(){
    return {
        type: form.entrada().checked ? "entrada" : "gasto",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.type().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

function cancelButton(){
    window.location.href = "../home/home.html"
}

function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch(() => {
        alert("Erro ao sair")
    })
}