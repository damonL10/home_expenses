import dotenv from "dotenv";
dotenv.config();

import Knex from "knex";
import knexConfig from "./knexfile";
import express from "express";
import http from "http";
import expressSession from "express-session";
import path from "path";

const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);
const PORT = 8080;
const app = express();
const server = new http.Server(app);

app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2),
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());

// for MVC modelling
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { BillService } from "./services/BillService";
import { BillController } from "./controllers/BillController";

const userService = new UserService(knex);
export const userController = new UserController(userService);

const billService = new BillService(knex);
export const billController = new BillController(billService);

import { billRoutes } from "./routers/billRoutes";
import { userRoutes } from "./routers/userRoutes";
import { isLoggedInStatic } from "./guard";

app.use("/bills", billRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(isLoggedInStatic, express.static(path.join(__dirname, "private")));

server.listen(PORT, () => {
  console.log(`welcome to my home_expenses page ԅ(‾⌣‾ԅ) hosting at http://localhost:${PORT} !!!!!`);
});
