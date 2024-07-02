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
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid )
        .orderBy('date', 'desc')
        .get()
        .then(snapshot =>{ 
            hideLoading();
            const transactions = snapshot.docs.map(doc => doc.data());
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
        const li = document.createElement('li');
        li.classList.add(transactions.type);

        const date = document.createElement('b');
        date.innerHTML = formatDate(transactions.date);
        li.appendChild(date);

        const value = document.createElement('p');
        value.innerHTML = transactions.money.currency + ' ' + transactions.money.value.toFixed(2);
        li.appendChild(value);

        const type = document.createElement('p');
        type.innerHTML = transactions.transactionType;
        li.appendChild(type);

        if(transactions.description){
            const description = document.createElement('p')
            description.innerHTML = transactions.description;
            li.appendChild(description)
        }
        
        orderedList.appendChild(li);
    });
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

