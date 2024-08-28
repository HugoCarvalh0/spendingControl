import { BadRequestError } from "../errors/bad-request.error.js";

export function validateCreateTransaction (request, response, next){

    const date = request.body.date;
    if (!date){
        return response.status(400).json(new BadRequestError("Data não informada"));
    }
    if (isNaN(new Date(date))){
        return response.status(400).json(new BadRequestError("Data Invalida"))
    }

    const money = request.body.money;
    if(!money){
        return response.status(400).json(new BadRequestError("Dinheiro não informado"));
    }
    if(!money.currency){
        return response.status(400).json(new BadRequestError("Moeda não informada"));        
    }
    if(!money.value){
        return response.status(400).json(new BadRequestError("Valor não informada"));        
    }

    const transactionType = request.body.transactionType;
    if(!transactionType){
        return response.status(400).json(new BadRequestError("Tipo de transação não informado"));  
    }

    const type = request.body.type;
    if(!type){
        return response.status(400).json(new BadRequestError("Transação (gasto/entrada) não informado"));          
    }
    if (type != "entrada" && type != "gasto"){
        return response.status(400).json(new BadRequestError("Transação (gasto/entrada) invalido"));
    }

    next();

}