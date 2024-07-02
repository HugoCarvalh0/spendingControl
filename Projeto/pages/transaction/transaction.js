const form = {
    date: () => document.getElementById("date"),
    date_required: () => document.getElementById("date_required"),
    value: () => document.getElementById("value"),
    value_required: () => document.getElementById("value_required"),
    negative_value: () => document.getElementById("negative_value"),
    type: () => document.getElementById("type"),
    type_required: () => document.getElementById("type_required"),
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