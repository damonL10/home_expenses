import { Admin } from "../models";
import type { Knex } from "knex";

export class UserService {
    constructor(private knex: Knex) {}

    async getUserByUsername(username: string) {
        return await this.knex<Admin>("admin")
        .select("id", "username", "password")
        .where("username", username).first();
    }

    async getAdminUsername(adminId: number) {
        type Record = Omit<Admin, "password">;
        return await this.knex<Record>("admin")
        .select("id", "username")
        .where("id", adminId).first();
    }

}