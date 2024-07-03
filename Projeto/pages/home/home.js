function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch(() => {
        alert("Erro ao sair")
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user){
        findTransactions(user);
    }
})

function findTransactions(user){
    showLoading();
    transactionService.findByUser(user)
        .then(transactions =>{ 
            hideLoading();
            addTransacationToScreen(transactions);
    }).catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao recuperar transações');
    })
}

function addTransacationToScreen(transactions){
    const orderedList = document.getElementById("transactionsList")

    transactions.forEach(transactions => {
        const li = createTransactionListItem(transactions);
        
        li.appendChild(createDeleteButton(transactions));
        li.appendChild(createBold(formatDate(transactions.date)));
        li.appendChild(createParagraph(transactions.money.currency + ' ' + transactions.money.value.toFixed(2)));
        li.appendChild(createParagraph(transactions.transactionType));

        if(transactions.description){
            li.appendChild(createParagraph(transactions.description))
        }
        
        orderedList.appendChild(li);
    });
}

function createTransactionListItem(transaction){
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.id = transaction.uid;
    li.addEventListener("click", () => {
        window.location.href = "../transaction/transaction.html?uid=" + transaction.uid;
    })
    return li;
}

function createDeleteButton(transaction){
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("bkTransparente", "alerta")
    deleteButton.innerHTML = "Deletar";
    deleteButton.addEventListener("click", event => {
        event.stopPropagation();
        confirmDelete(transaction);
    })
    return deleteButton;
}

function createParagraph(value){
    const element = document.createElement('p')
    element.innerHTML = value;
    return element;
}

function createBold(value){
    const date = document.createElement('b');
    date.innerHTML = value
    return date
}

function confirmDelete(transactions){
    const confirmação = confirm("Deseja remover a transação?")
    if (confirmação){
        removeTransaction(transactions)
    }
}

function removeTransaction(transactions){
    showLoading();

    transactionService.remove(transactions)
    .then(() => {
        hideLoading();
        document.getElementById(transactions.uid).remove();
    }).catch(error => {
        hideLoading();
        console.log(error)
        alert("Erro ao remover transação")
    })
}

function formatDate(date){
    //Feito dessa forma pois retornava um dia antes
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate()+1);
    return newDate.toLocaleDateString();
}

function newTransaction(){
    window.location.href = "../transaction/transaction.html"
}

