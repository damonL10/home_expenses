import express from "express";
import { billController } from "../main";

export const billRoutes = express.Router();

billRoutes.get("/", billController.getAllBills);
billRoutes.post("/", billController.createBill);
billRoutes.put("/update/:itemid", billController.updateBillItemAmount);
billRoutes.delete("/:itemid", billController.deleteBillItem);
billRoutes.get("/yearlyrecord", billController.getYearlyRecord);
billRoutes.get("/monthlyrecord", billController.getMonthlyRecord);
billRoutes.get("/singlemonthrecord", billController.getSingleMonthRecord);