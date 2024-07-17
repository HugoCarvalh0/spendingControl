import { TransactionNotFoundError } from "../errors/transaction-not-found.error copy.js";
import { TransactionUidNotInformedError } from "../errors/transaction-uid-not-informed.error.js";
import { UserNotInformedError } from "../errors/user-not-informed.error.js";
import { Transaction } from "../model.js";
import { TransactionRepository } from "../repository.js";

describe("Transaction model", () => {

    describe("Dado estar buscando usuário por uid", () => {

        // const transactionRepositoryMock = {
        //     findByUserUid: () => Promise.resolve([
        //         {uid: "transaction1"}, {uid: "transaction2"} 
        //     ])
        // } 

        let transactionRepositoryMock;
        let model;

        beforeEach(() => {
            transactionRepositoryMock = new TransactionRepositoryMock();
            model = new Transaction(transactionRepositoryMock);
        })

        test("Caso *não* informado, retorna um código de erro 500", async () =>{

            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
        test("Caso *não* informado, retorna um código de erro 500", async () =>{
            model.user = {};
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
        test("Caso informado, retorna transações", async () =>{
            model.user = {uid: "anyUserUid"};

            const transactions = [{uid: "transaction1"}, {uid: "transaction2"}];
            transactionRepositoryMock._response = Promise.resolve(transactions)

            const response = model.findByUser();
    
            await expect(response).resolves.toEqual(transactions);
        })
    })

    describe("Dado buscar transação por id", () => {

        test("Caso tenha id, então retornar transação", async () => {
            const model = new Transaction({
                findByUid: () => Promise.resolve(createTransaction())
            });
            model.uid = 1;

            await model.findByUid();

            expect(model).toEqual(createTransaction())

        })

        test("Caso não tenha id, retornar erro 500", async () => {
            const model = new Transaction();

            await expect(model.findByUid()).rejects.toBeInstanceOf(TransactionUidNotInformedError);

        })

        function createTransaction(){
            const transaction = new Transaction();
            transaction.uid = 1;
            transaction.date = "AnyDate";
            transaction.description = "AnyDescription";
            transaction.money = {
                currency: "AnyCurrency",
                value: 10
            };
            transaction.transactionType = "Supermercado";
            transaction.type = "income";
            transaction.user = {
                uid: "AnyUserUid"
            }
            return transaction;
        }

    })

    class TransactionRepositoryMock {
        _response;
        findByUserUid(){
            return this._response;
        }
    }
    
    test("Quando transação não encontrada, retorna ero 404", async () => {

        const model = new Transaction({
            findByUid: () => Promise.resolve(null)
        });
        model.uid = 9

        await expect(model.findByUid()).rejects.toBeInstanceOf(TransactionNotFoundError);

    })

})