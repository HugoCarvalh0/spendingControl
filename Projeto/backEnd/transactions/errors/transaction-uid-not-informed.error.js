export class TransactionUidNotInformedError extends Error{

    constructor(){
        super("uid da transação não informado")
        this.name = "Transaction-uid-not-informed";
        this.code = 500
    }

}