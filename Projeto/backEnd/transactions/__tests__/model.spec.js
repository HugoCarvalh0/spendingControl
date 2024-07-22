import { TransactionNotFoundError } from "../errors/transaction-not-found.error copy.js";
import { TransactionUidNotInformedError } from "../errors/transaction-uid-not-informed.error.js";
import { UserDoesntOwnTransactionError } from "../errors/user-doesnt-own-transaction.error.js";
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

    describe("Dado buscar transação por uid", () => {

        test("Caso tenha uid, então retornar transação", async () => {
            const model = new Transaction({
                findByUid: () => Promise.resolve(createTransaction())
            });
            model.uid = 1;
            model.user = {uid: "anyUserUid"};

            await model.findByUid();

            expect(model).toEqual(createTransaction())

        })

        test("Mas não ser o dono da transação, retorna erro 403", async () => {
            const transactionDb = createTransaction();
            transactionDb.user = {uid: "anyOtherUserUid"}

            const model = new Transaction({
                findByUid: () => Promise.resolve(transactionDb)
            })
            model.uid = 9;
            model.user = {uid: "AnyUserUid"};

            await expect(model.findByUid()).rejects.toBeInstanceOf(UserDoesntOwnTransactionError)
        })

        test("Caso não tenha uid, retornar erro 500", async () => {
            const model = new Transaction();

            await expect(model.findByUid()).rejects.toBeInstanceOf(TransactionUidNotInformedError);

        })

    })
    
    test("Quando transação não encontrada, retorna ero 404", async () => {

        const model = new Transaction({
            findByUid: () => Promise.resolve(null)
        });
        model.uid = 9

        await expect(model.findByUid()).rejects.toBeInstanceOf(TransactionNotFoundError);

    })

    describe("Dado criar nova transação", () => {

        const params = {
            date: "anyDate",
            description: "anyDescription",
            money: {
                currency: "anyCurrency",
                value:10
            },
            transactionType: "supermercado",
            type: "income",
            user:{
                uid: "anyUserUid"
            }

            
        }

        const repositoryMock = {
            _hasSaved: false,
            save() {
                this._hasSaved = true;
                return Promise.resolve({uid: 1});
            }
        }

        test("Ao criar, retornar transação", async () => {

            const model = new Transaction(repositoryMock) 
            await model.create(params); 

            const newTransaction = createTransaction();

            expect(model).toEqual(newTransaction)

        })

        test("Ao criar, salvar transação", async () => {
            const model = new Transaction(repositoryMock);
            
            await model.create(params)

            expect(repositoryMock._hasSaved).toBeTruthy();

        })

    })

    function createTransaction(){
        const transaction = new Transaction();
        transaction.uid = 1;
        transaction.date = "anyDate";
        transaction.description = "anyDescription";
        transaction.money = {
            currency: "anyCurrency",
            value: 10
        };
        transaction.transactionType = "supermercado";
        transaction.type = "income";
        transaction.user = {
            uid: "anyUserUid"
        }
        return transaction;
    }

    class TransactionRepositoryMock {
        _response;
        findByUserUid(){
            return this._response;
        }
    }

})