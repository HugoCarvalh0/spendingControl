function showLoading(){
    const div = document.createElement("div");
    div.classList.add("carregando", "centralizar")
    
    const label = document.createElement("label")
    label.innerText = "Carregando..."

    div.appendChild(label)

    document.body.appendChild(div)
}

function hideLoading(){
    const loadings = document.getElementsByClassName("carregando")
    if (loadings.length){
        loadings[0].remove();
    }
}