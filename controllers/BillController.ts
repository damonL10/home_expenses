import { Request, Response } from "express";
import { BillService } from "../services/BillService";


export class BillController {
    constructor(private billService: BillService) {}
        

        createBill = async (req: Request, res: Response) => {
            const { 
                transaction_date,
                category_id_1,
                amount_1,
                category_id_2, 
                amount_2,
                category_id_3,
                amount_3,
                category_id_4, 
                amount_4,
                category_id_5,
                amount_5,
                category_id_6,
                amount_6,
                category_id_7,
                amount_7,
                category_id_8,
                amount_8,
                category_id_9,
                amount_9,
                category_id_10,
                amount_10,
                category_id_11,
                amount_11,
                category_id_12,
                amount_12,
            } = req.body;
            if (!transaction_date) {
                res.status(400).json({ message: "invalid input"});
                return;
            };
            const bill = await this.billService.createBill(transaction_date,
                category_id_1,
                amount_1,
                category_id_2, 
                amount_2,
                category_id_3,
                amount_3,
                category_id_4, 
                amount_4,
                category_id_5,
                amount_5,
                category_id_6,
                amount_6,
                category_id_7,
                amount_7,
                category_id_8,
                amount_8,
                category_id_9,
                amount_9,
                category_id_10,
                amount_10,
                category_id_11,
                amount_11,
                category_id_12,
                amount_12);
            // console.log(bill);
            res.status(201).json({message: "create Bill success!!"});
        }; 


        getAllBills = async (req: Request, res: Response) => {
            const bills = await this.billService.getAllBills();
            res.json(bills);
        };


        updateBillItemAmount = async (req: Request, res: Response) => {
            const billItemId = parseInt(req.params.itemid, 10);
            // console.log(billItemId, "updated");
            if (isNaN(billItemId)) {
                res.status(400).json({message: "invalid bill item id"});
                return;
            }
            const new_amount = parseInt(req.body.newAmount, 10);
            // console.log("new amount is", new_amount);
            await this.billService.updateBillItemAmount(new_amount, billItemId);
            res.json({message: "update bill item amount success"});
        };


        deleteBillItem = async (req: Request, res: Response) => {
            const billItemId = parseInt(req.params.itemid, 10);
            // console.log(billItemId, "deleted");
            if (isNaN(billItemId)) {
                res.status(400).json({message: "invalid bill item id"});
                return;
            }
            await this.billService.deleteItem(billItemId);
            res.json({message: "delete bill item success"});
        };


        getYearlyRecord = async (req: Request, res: Response) => {
            const year = parseInt(req.query.year as string);
            // console.log("yearly_year entered is", year); 
            const yearlyRecord = await this.billService.loadYearlyRecord(year);
            res.json(yearlyRecord);
        };


        getMonthlyRecord = async (req: Request, res: Response) => {
            const year = parseInt(req.query.year as string);
            // console.log("monthly_year entered is", year);
            const monthlyRecord = await this.billService.loadMonthlyRecord(year);
            res.json(monthlyRecord);
        };

        getSingleMonthRecord = async (req: Request, res: Response) => {
            const month = req.query.month as string;
            const year = parseInt(req.query.year as string);
            // console.log(`selected year is ${year}, selected month is ${month}`);
            const singleMonthRecord = await this.billService.loadSingleMonthRecord(month, year);
            res.json(singleMonthRecord);

        };

}