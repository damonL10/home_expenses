import type{ Request, Response } from "express";
import type { Knex } from "knex";
import { BillController } from "../../controllers/BillController";
import { BillService } from "../../services/BillService";
import { getMockRequest, getMockResponse } from "./utils";

jest.mock("../../services/BillService");

describe("testing on BillController", () => {
    let controller: BillController;
    let service: BillService;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new BillService({} as Knex);
        service.getAllBills = jest.fn(() => Promise.resolve([{ transaction_date: "2022-12-15", category_id_1: 1, amount_1: 12, category_id_2: 2, amount_2: 22 }]));
        service.createBill = jest.fn(() => Promise.resolve());
        service.updateBillItemAmount = jest.fn();
        service.deleteItem = jest.fn();
        controller = new BillController(service);
        req = getMockRequest();
        res = getMockResponse();
    });

    it("success to get all bills", async() => {
        req.body = { id: 1};
        await controller.getAllBills(req, res);
        
        expect(service.getAllBills).toBeCalledTimes(1);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([
            { transaction_date: "2022-12-15", category_id_1: 1, amount_1: 12, category_id_2: 2, amount_2: 22 },
        ]);
    });

    it("fail to create bill - invalid input", async() => {
        await controller.createBill(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "invalid input"});
    });

    it("success to create bill", async() => {
        req.body = {
            transaction_date: "2022-12-15",
            category_id_1: 1, amount_1: 1,
            category_id_2: 2, amount_2: 2,
            category_id_3: 3, amount_3: 3,
            category_id_4: 4, amount_4: 4,
            category_id_5: 5, amount_5: 5,
            category_id_6: 6, amount_6: 6,
            category_id_7: 7, amount_7: 7,
            category_id_8: 8, amount_8: 8,
            category_id_9: 9, amount_9: 9,
            category_id_10: 10, amount_10: 10,
            category_id_11: 11, amount_11: 11,
            category_id_12: 12, amount_12: 12
        };
        await controller.createBill(req, res);

        expect(service.createBill).toBeCalledWith("2022-12-15", 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12);
        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "create Bill success!!" });
    });


    it("sucess to update bill item amount", async() => {
        req.params["itemid"] = "1";
        req.body = { newAmount: 234 };
        await controller.updateBillItemAmount(req, res);

        expect(service.updateBillItemAmount).toBeCalledWith(234, 1);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "update bill item amount success" });
    });


    it("sucess to delete bill item", async() => {
        req.params["itemid"] = "11";
        await controller.deleteBillItem(req, res);

        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ message: "delete bill item success" });
    });

});