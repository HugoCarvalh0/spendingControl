import express from "express";
import admin from "firebase-admin";
import { authenticateToken } from "./middlewares/auth-jwt.js";

const app = express();

//Solução rápida e temporária para desativar a verificação de certificados SSL/TLS, útil em ambientes de desenvolvimento ou teste. 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

admin.initializeApp({
    credential: admin.credential.cert("../../../serviceAccountKey.json")
  });

//GET http://api.controle-de-gastos.com/transactions
app.get('/transactions', authenticateToken, (request, response) => {
    console.log("Chamou a API")
    admin.firestore()
    .collection('transactions')
    .where("user.uid", "==", request.user.uid)
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        response.json(transactions);
    })
})

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));
