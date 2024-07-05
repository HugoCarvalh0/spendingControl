import admin from "firebase-admin";

export async function authenticateToken(request, response, next){
    console.log("Chamou o middleware")
    const jwt = request.headers.authorization;
    if (!jwt){
        response.status(401).json({message: "Usuário não authorizado"})
    }

    let decodedIdToken = "";
    try{
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch {
        response.status(401).json({message: "Usuário não authorizado"})
        return;
    }
    
    request.user = {
        uid: decodedIdToken.sub
    }

    next();
}