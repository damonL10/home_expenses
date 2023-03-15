import { Knex } from "knex";

const adminTable = "admin";
const expensesTable = "expenses_table";
const expense_category_mappingTable = "expense_category_mapping";
const expense_categoryTable = "expense_category";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(adminTable, (table) => {
    table.increments();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(expensesTable, (table) => {
    table.increments();
    table.string("transaction_date").notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(expense_categoryTable, (table) => {
    table.increments();
    table.string("category_name");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(expense_category_mappingTable, (table) => {
    table.increments();
    table.integer("transaction_date_id").unsigned().notNullable();
    table.foreign("transaction_date_id").references(`${expensesTable}.id`);
    table.integer("expense_category_id").unsigned().notNullable();
    table.foreign("expense_category_id").references(`${expense_categoryTable}.id`);
    table.integer("amount").unsigned().notNullable();
    table.timestamps(false, true);
  });

};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(expense_category_mappingTable);
  await knex.schema.dropTable(expense_categoryTable);
  await knex.schema.dropTable(expensesTable);
  await knex.schema.dropTable(adminTable);
};