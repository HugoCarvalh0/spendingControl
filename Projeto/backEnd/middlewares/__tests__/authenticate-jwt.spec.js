import { authenticateToken } from "../auth-jwt.js"

describe("Authenticate jwt", () => {

    describe("Dado o cabeçalho de autorização", () => {
        test("Quando não existente, retorna erro 401", () => {
            const request = {
                headers: {}
            };
            const response = new ResponseMock;
            next = () => { };

            authenticateToken(request, response, next)
            expect(response._status).toEqual(401);
        })

        test("Quando inválido, retorna erro 401", async () => {
            const request = {
                headers: {authorization: "invalid"}
            };
            const response = new ResponseMock;
            next = () => { };

            await authenticateToken(request, response, next, {
                verifyIdToken: () => Promise.reject()
            })
            expect(response._status).toEqual(401);
        })

        test("Quando válido, adicionar usuário ao request", async () => {
            const request = {
                headers: {authorization: "valid"}
            };
            const response = new ResponseMock;
            next = () => { };

            await authenticateToken(request, response, next, {
                verifyIdToken: () => ({sub: "anyUserUid"})
            })
            expect(request.user).toEqual({uid: "anyUserUid"});
        })

    })

    class ResponseMock {
        _status;
        status(value) {
            this._status = value;
            return this;
        }
        json(value) {

        }
    }
})

