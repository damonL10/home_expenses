import type{ Request, Response } from "express";
import type { Knex } from "knex";
import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import { getMockRequest, getMockResponse } from "./utils";
// import { checkPassword } from "../../hash";

jest.mock("../../services/UserService");

describe("testing on UserController", () => {
    let controller: UserController;
    let service: UserService;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new UserService({} as Knex);
        service.getUserByUsername = jest.fn(() => Promise.resolve({ id: 1, username: "test", password: "test" }));
      
        service.getAdminUsername = jest.fn();
        controller = new UserController(service);
        req = getMockRequest();
        res = getMockResponse();
    });

    it("fail to login", async() => {
        await controller.login(req, res);

        expect(res.status).toBeCalledWith(400); 
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "missing username/password"});
    });
});
