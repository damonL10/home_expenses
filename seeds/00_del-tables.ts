import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    const tables = ["expense_category_mapping", "expense_category", "expenses_table", "admin"];
    const trx = await knex.transaction();
    try {
        for (const table of tables) {
            await trx(table).del();
        };

        await trx.commit();
    } catch (e) {
        await trx.rollback();
    }
};