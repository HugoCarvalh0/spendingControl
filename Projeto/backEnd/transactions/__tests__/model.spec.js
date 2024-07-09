import { UserNotInformedError } from "../errors/user-not-informed.error.js";
import { Transaction } from "../model.js";

describe("Transaction model", () => {

    const transactionRepositoryMock = {
        findByUserUid: () => Promise.resolve([
            {uid: "transaction1"}, {uid: "transaction2"} 
        ])
    } 

    describe("Dado estar buscando usuário por uid", () => {

        test("Caso *não* informado, retorna um código de erro 500", async () =>{

            const model = new Transaction();
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
        test("Caso *não* informado, retorna um código de erro 500", async () =>{
    
            const model = new Transaction();
            model.user = {};
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
        test("Caso informado, retorna transações", async () =>{
    
            const model = new Transaction(transactionRepositoryMock);
            model.user = {uid: "anyUserUid"};
            const response = model.findByUser();
    
            await expect(response).resolves.toEqual([
                {uid: "transaction1"}, {uid: "transaction2"} 
            ]);
        })
    })

    
    

})