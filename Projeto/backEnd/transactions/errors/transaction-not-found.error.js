export class TransactionNotFoundError extends Error{

    constructor(){
        super("uid da transação não encontrada")
        this.name = "Transaction-not-found";
        this.code = 404
    }

}