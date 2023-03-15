import express from "express";
import { isLoggedInApi } from "../guard";
import { userController } from "../main";

export const userRoutes = express.Router();

userRoutes.post("/login", userController.login);
userRoutes.get("/adminname", isLoggedInApi, userController.getLoggedInAdminName);