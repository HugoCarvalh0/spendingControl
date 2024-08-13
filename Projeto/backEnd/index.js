import express, { json } from "express";
import admin from "firebase-admin";
import { transactionsRouter } from "./transactions/routes.js";

const app = express();

//Solução rápida e temporária para desativar a verificação de certificados SSL/TLS, útil em ambientes de desenvolvimento ou teste. 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

admin.initializeApp({
    credential: admin.credential.cert("../../../serviceAccountKey.json")
  });

app.use(json());  

app.use('/transactions', transactionsRouter);

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));
