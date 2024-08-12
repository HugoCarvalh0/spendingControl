import { TransactionController } from "../controller.js";

describe("Transaction Controller", () => {

    describe("Dado a busca de transações de usuário", () => {
        let request;
        let response;

        beforeEach(() => {
        request = {};
        response = new ResponseMock();
        })

        test("Caso sucesso, retornar transações", (done) => {
            const transactions = [{uid:1},{uid:2}];

            const controller = new TransactionController({
                findByUser: () => Promise.resolve(transactions)
            });

            controller.findByUser(request, response).then(()=>{
                expect(response._json).toEqual(transactions);
                done();
            });
        })

        test("Caso falha, retornar erro", (done) =>{
            const error = {code: 500};
            
            const controller = new TransactionController({
                findByUser: () => Promise.reject(error)
            });

            controller.findByUser(request, response).then(() => {
                expect(response._json).toEqual(error);
                done();
            })
        })

        test("Caso falha, retornar erro cód. 500", (done) =>{
            const error = {code: 500};
            
            const controller = new TransactionController({
                findByUser: () => Promise.reject(error)
            });

            controller.findByUser(request, response).then(() => {
                expect(response._status).toEqual(500);
                done();
            })
        })

        describe("Dado busca de transação por uid",() => {

            test("Quando sucesso, retornar status 200", async () => {
                const controller = new TransactionController({
                    findByUid: () => Promise.resolve()
                });

                const request = {params: {uid: 1}}
                const response = new ResponseMock();

                await controller.findByUid(request, response);

                expect(response._status).toEqual(200);
            })

            test("Quando sucesso, retornar transação", async () => {
                const transaction = {
                    findByUid: () => Promise.resolve()
                }

                const controller = new TransactionController(transaction);

                const request = {params: {uid: 1}}
                const response = new ResponseMock();

                await controller.findByUid(request, response);

                expect(response._json).toEqual(transaction);
            })

            test("Quando erro, retornar erro 500", async () => {
                const controller = new TransactionController({
                    findByUid: () => Promise.reject({code:500})
                });

                const request = {params: {uid: 1}}
                const response = new ResponseMock();

                await controller.findByUid(request, response);

                expect(response._status).toEqual(500);
            })

            test("Quando erro, retornar mensagem de erro", async () => {
                const controller = new TransactionController({
                    findByUid: () => Promise.reject({code:500})
                });

                const request = {params: {uid: 1}}
                const response = new ResponseMock();

                await controller.findByUid(request, response);

                expect(response._json).toEqual({code: 500});
            })

        })

        describe(" Dado criação de nova transação", () => {

            test("Ao sucesso, retornar status 200", async () => {
                const controller = new TransactionController({
                    create: () => Promise.resolve()
                });

                const request = {body: {}};
                const response = new ResponseMock();

                await controller.create(request, response);

                expect(response._status).toEqual(200);
            })

            test("Ao sucesso, retornar transação", async () => {
                const transaction = {
                    create: () => Promise.resolve()
                }
                const controller = new TransactionController(transaction);

                const request = {body: {}};
                const response = new ResponseMock();

                await controller.create(request, response);

                expect(response._json).toEqual(transaction);
            })

            test("Ao sucesso, pertencer ao usuário da requisição", async () => {
                const transaction = {
                    create: () => Promise.resolve()
                }
                const controller = new TransactionController(transaction);

                const request = {body: {}, user: {uid: "anyUserUid"}};
                const response = new ResponseMock();

                await controller.create(request, response);

                expect(response._json.user).toEqual({uid: "anyUserUid"});
            })

            test("Ao falhar, retornar status de erro ", async () => {
                const controller = new TransactionController({
                    create: () => Promise.reject({code: 500})
                });

                const request = {body: {}};
                const response = new ResponseMock();

                await controller.create(request, response);

                expect(response._status).toEqual(500);
            })

            test("Ao falhar, retornar erro ", async () => {
                const controller = new TransactionController({
                    create: () => Promise.reject({code: 500})
                });

                const request = {body: {}};
                const response = new ResponseMock();

                await controller.create(request, response);

                expect(response._json).toEqual({code: 500});
            })
        })

    })

    class ResponseMock{
        _json = null;
        _status = 0;
        json(value){
            this._json = value;
        }
        status(value){
            this._status = value;
            return this;
        }
    }
})