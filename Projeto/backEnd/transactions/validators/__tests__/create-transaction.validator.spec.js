import { BadRequestError } from "../../errors/bad-request.error";
import { validateCreateTransaction } from "../create-transaction.validator";

describe ('Create transaction validator', () => {

    let request;
    let response;

    beforeEach (() => {
        request = {
            body: {
                date: "2030-01-01",
                money: {
                    currency: "AnyCurrency",
                    value: 100
                },
                transactionType: "AnyTransactionType",
                type: "gasto"
            }
        };
        response = new ResponseMock();
    })

    test('Dado a data não informada, retornar erro 400', () => {
       
        request.body.date = null

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado a data não informada, retornar erro', () => {

        request.body.date = null

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado a data invalida, retornar erro 400', () => {

        request.body.date = "invalidDate";
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado a data invalida, retornar erro', () => {

        request.body.date = "invalidDate";
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado money não informado, retornar erro 400', () => {

        request.body.money = null;
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado money não informado, retornar erro', () => {

        request.body.money = null;
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado moeda não informada, retornar erro 400', () => {

        request.body.money.currency = null;
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado moeda não informada, retornar erro', () => {

        request.body.money.currency = null;
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado valor não informado, retornar erro 400', () => {

        request.body.money.value = 0;
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado valor não informado, retornar erro', () => {

        request.body.money.value = 0;
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado tipo de transação não informado, retornar erro 400', () => {

        request.body.transactionType = null;
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado tipo de transação não informado, retornar erro', () => {

        request.body.transactionType = null;
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado transação (gasto/entrada) não informado, retornar erro 400', () => {

        request.body.type = null;
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado transação (gasto/entrada) não informado, retornar erro', () => {

        request.body.type = null;
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado transação (gasto/entrada) diferente do esperado, retornar erro 400', () => {

        request.body.type = "anyOtherType";
       
        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('Dado transação (gasto/entrada) diferente do esperado, retornar erro', () => {

        request.body.type = "anyOtherType";
       
        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('Dado transação válida, vá para o proximo passo', () =>{
        let hasCalledNext = false;
        const next = () =>  {hasCalledNext = true};

        validateCreateTransaction(request, response, next);

        expect(hasCalledNext).toBeTruthy();
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