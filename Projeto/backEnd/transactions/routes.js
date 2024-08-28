import express from "express"
import admin from "firebase-admin"
import { TransactionController } from "./controller.js";
import { authenticateToken } from "../middlewares/auth-jwt.js";
import { validateCreateTransaction } from "./validators/create-transaction.validator.js";

const app = express();
const transactionController = new TransactionController();

app.get('/', 
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) => transactionController.findByUser(request, response)
);
app.get('/:uid', 
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) => transactionController.findByUid(request, response)
);
app.post('/',
    (request, response, next) => validateCreateTransaction(request, response, next), 
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) => transactionController.create(request, response)
);

export const transactionsRouter = app;