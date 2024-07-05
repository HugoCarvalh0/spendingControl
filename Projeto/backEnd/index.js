import express from "express";
import admin from "firebase-admin";

const app = express();

//REST API http://api.controle-de-gastos.com/transactions

//Solução rápida e temporária para desativar a verificação de certificados SSL/TLS, útil em ambientes de desenvolvimento ou teste. 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

admin.initializeApp({
    credential: admin.credential.cert("../../../serviceAccountKey.json")
  });

//GET http://api.controle-de-gastos.com/transactions
app.get('/transactions', async (request, response) => {
    const jwt = request.headers.authorization;
    if (!jwt){
        response.status(401).json({message: "Usuário não authorizado"})
    }

    let decodedIdToken = "";
    try{
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch {
        response.status(401).json({message: "Usuário não authorizado"})
    }

    admin.firestore()
    .collection('transactions')
    .where("user.uid", "==", decodedIdToken.sub)
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        response.json(transactions);
    })
    // response.json([{id:1}]);
})

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));
