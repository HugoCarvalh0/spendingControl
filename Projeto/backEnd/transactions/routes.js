import express from "express"
import { TransactionController } from "./controller.js";
import { authenticateToken } from "../middlewares/auth-jwt.js";

const app = express();
const transactionController = new TransactionController();

app.get('/', authenticateToken, transactionController.findByUser)

export const transactionsRouter = app;