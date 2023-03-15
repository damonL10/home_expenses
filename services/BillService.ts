import type { Knex } from "knex";

export class BillService {

    constructor(private knex: Knex) {}

    createBill = async (transaction_date: string, category_id_1: number, amount_1: number, category_id_2: number, amount_2: number, category_id_3: number, amount_3: number, category_id_4: number, amount_4: number, category_id_5: number, amount_5: number, category_id_6: number, amount_6: number, category_id_7: number, amount_7: number, category_id_8: number, amount_8: number, category_id_9: number, amount_9: number, category_id_10: number, amount_10: number, category_id_11: number, amount_11: number, category_id_12: number, amount_12: number) => {
        const transactionDateQueryResult = await this.knex("expenses_table")
        .insert({transaction_date: transaction_date})
        .returning(["id"]);    
        // console.log(transactionDateQueryResult[0]);
        let id = transactionDateQueryResult[0].id;
        const transaction1QueryResult = await this.knex("expense_category_mapping")
        .insert({
            transaction_date_id: id,
            expense_category_id: category_id_1,
            amount: amount_1,
        });

        if(amount_2){
            const transaction2QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_2,
                amount: amount_2,
            });
        };

        if(amount_3){
            const transaction3QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_3,
                amount: amount_3,
            });
        };
        
        if(amount_4){
            const transaction4QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_4,
                amount: amount_4,
            });
        };

        if(amount_5){
            const transaction5QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_5,
                amount: amount_5,
            });
        };

        if(amount_6){
            const transaction6QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_6,
                amount: amount_6,
            });
        };

        if(amount_7){
            const transaction7QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_7,
                amount: amount_7,
            });
        };

        if(amount_8){
            const transaction8QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_8,
                amount: amount_8,
            });
        };

        if(amount_9){
            const transaction9QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_9,
                amount: amount_9,
            });
        };

        if(amount_10){
            const transaction10QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_10,
                amount: amount_10,
            });
        };

        if(amount_11){
            const transaction11QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_11,
                amount: amount_11,
            });
        };

        if(amount_12){
            const transaction12QueryResult = await this.knex("expense_category_mapping")
            .insert({
                transaction_date_id: id,
                expense_category_id: category_id_12,
                amount: amount_12,
            });
        };
    };

    getAllBills = async () => {
        return await this.knex("expense_category_mapping")
        .select("expense_category_mapping.id", "expenses_table.transaction_date", "expense_category.category_name", "expense_category_mapping.amount")
        .join("expenses_table", "expense_category_mapping.transaction_date_id", "expenses_table.id")
        .join("expense_category", "expense_category_mapping.expense_category_id", "expense_category.id")
        .orderBy("expenses_table.transaction_date", "DESC")
        .orderBy("expense_category.id")
    };


    updateBillItemAmount = async (amount: number, billItemId: number) => {
        await this.knex("expense_category_mapping")
        .update({ amount })
        .where("id", billItemId)
    };


    deleteItem = async (billItemId: number) => {
        await this.knex("expense_category_mapping")
        .delete()
        .where("id", billItemId)
    };


    loadYearlyRecord = async(year: number) => {
        let year_start1 = `${year}-01-01` as string;
        // console.log(year_start1);
        let year_end1 = `${year}-12-31` as string;
        let year_total = `${year}年全年總計` as string;
        let year_start2 = `${year}-01-01` as string;
        let year_end2 = `${year}-12-31` as string;
        const yearlyRecordQueryResult = await this.knex.raw(`(SELECT category_name, sub_total FROM 
        ( SELECT expense_category.category_name as category_name, 
            SUM (expense_category_mapping.amount) AS sub_total, 
            0 AS sortorder 
            FROM expense_category_mapping 
            JOIN expense_category on expense_category_mapping.expense_category_id = expense_category.id 
            JOIN expenses_table on expenses_table.id = expense_category_mapping.transaction_date_id 
            WHERE expenses_table.transaction_date BETWEEN :start1 AND :end1 
            GROUP BY expense_category.category_name 
            UNION 
            SELECT :total as category_name, SUM(expense_category_mapping.amount) AS sub_total, 1 AS sortorder 
            FROM expense_category_mapping 
            JOIN expense_category on expense_category_mapping.expense_category_id = expense_category.id 
            JOIN expenses_table on expenses_table.id = expense_category_mapping.transaction_date_id 
            WHERE expenses_table.transaction_date BETWEEN :start2 AND :end2 
            ) AS unionquery ORDER BY sortorder)`, {start1: year_start1 as string, end1: year_end1 as string, total: year_total as string, start2: year_start2 as string, end2: year_end2 as string}
        );
        // console.log(yearly_record.rows);
        return yearlyRecordQueryResult.rows;
    };
    

    loadMonthlyRecord = async(year: number) => {
        let jan_start = `${year}-01-01`;
        let jan_end = `${year}-01-31`;
        let feb_start = `${year}-02-01`;
        let feb_end = `${year}-02-31`;
        let mar_start = `${year}-03-01`;
        let mar_end = `${year}-03-31`;
        let apr_start = `${year}-04-01`;
        let apr_end = `${year}-04-31`;
        let may_start = `${year}-05-01`;
        let may_end = `${year}-05-31`;
        let jun_start = `${year}-06-01`;
        let jun_end = `${year}-06-31`;
        let jul_start = `${year}-07-01`;
        let jul_end = `${year}-07-31`;
        let aug_start = `${year}-08-01`;
        let aug_end = `${year}-08-31`;
        let sep_start = `${year}-09-01`;
        let sep_end = `${year}-09-31`;
        let oct_start = `${year}-10-01`;
        let oct_end = `${year}-10-31`;
        let nov_start = `${year}-11-01`;
        let nov_end = `${year}-11-31`;
        let dec_start = `${year}-12-01`;
        let dec_end = `${year}-12-31`;
        const monthlyRecordQueryResult = await this.knex.raw(`SELECT expense_category.category_name, 
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :jan_s AND :jan_e) AS jan_sub_total, 
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :feb_s AND :feb_e) AS feb_sub_total, 
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :mar_s AND :mar_e) AS mar_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :apr_s AND :apr_e) AS apr_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :may_s AND :may_e) AS may_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :jun_s AND :jun_e) AS jun_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :jul_s AND :jul_e) AS jul_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :aug_s AND :aug_e) AS aug_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :sep_s AND :sep_e) AS sep_sub_total,       
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :oct_s AND :oct_e) AS oct_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :nov_s AND :nov_e) AS nov_sub_total,
        SUM (expense_category_mapping.amount) FILTER (WHERE expenses_table.transaction_date BETWEEN :dec_s AND :dec_e) AS dec_sub_total   
        FROM expense_category_mapping JOIN expense_category on expense_category_mapping.expense_category_id = expense_category.id JOIN expenses_table on expenses_table.id = expense_category_mapping.transaction_date_id 
        GROUP BY expense_category.category_name ORDER BY expense_category.category_name`, {jan_s: jan_start as string, jan_e: jan_end as string,
            feb_s: feb_start as string, feb_e: feb_end as string,
            mar_s: mar_start as string, mar_e: mar_end as string,
            apr_s: apr_start as string, apr_e: apr_end as string,
            may_s: may_start as string, may_e: may_end as string,
            jun_s: jun_start as string, jun_e: jun_end as string,
            jul_s: jul_start as string, jul_e: jul_end as string,
            aug_s: aug_start as string, aug_e: aug_end as string,
            sep_s: sep_start as string, sep_e: sep_end as string,
            oct_s: oct_start as string, oct_e: oct_end as string,
            nov_s: nov_start as string, nov_e: nov_end as string,
            dec_s: dec_start as string, dec_e: dec_end as string }
        );
        // console.log(monthlyRecordQueryResult.rows);
        return monthlyRecordQueryResult.rows;
    };

    loadSingleMonthRecord = async(month: string, year: number) => {
        let month_start1 = `${year}-${month}-01` as string;
        let month_end1 = `${year}-${month}-31` as string;
        let month_total = `${month}月總計` as string;
        let month_start2 = `${year}-${month}-01` as string;
        let month_end2 = `${year}-${month}-31` as string;
        const singleMonthRecordQueryResult = await this.knex.raw(`(SELECT category_name, sub_total FROM 
        ( SELECT expense_category.category_name as category_name, 
            SUM (expense_category_mapping.amount) AS sub_total, 
            0 AS sortorder 
            FROM expense_category_mapping 
            JOIN expense_category on expense_category_mapping.expense_category_id = expense_category.id 
            JOIN expenses_table on expenses_table.id = expense_category_mapping.transaction_date_id 
            WHERE expenses_table.transaction_date BETWEEN :start1 AND :end1 
            GROUP BY expense_category.category_name 
            UNION 
            SELECT :total as category_name, SUM(expense_category_mapping.amount) AS sub_total, 1 AS sortorder 
            FROM expense_category_mapping 
            JOIN expense_category on expense_category_mapping.expense_category_id = expense_category.id 
            JOIN expenses_table on expenses_table.id = expense_category_mapping.transaction_date_id 
            WHERE expenses_table.transaction_date BETWEEN :start2 AND :end2 
            ) AS unionquery ORDER BY sortorder)`, {start1: month_start1 as string, end1: month_end1 as string, total: month_total as string, start2: month_start2 as string, end2: month_end2 as string}
        );
        // console.log(singleMonthRecordQueryResult.rows);
        return singleMonthRecordQueryResult.rows;
    };
    
};