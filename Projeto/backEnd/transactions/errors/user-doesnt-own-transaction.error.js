export class UserDoesntOwnTransactionError extends Error{

    constructor(){
        super("Usuário não autorizado");
        this.name = "User-doesnt-own-transaction";
        this.code = 403
    }

}