import { Knex } from "knex";
import { hashPassword } from "../hash";
import type{ Admin } from "../models";


export async function seed(knex: Knex): Promise<void> {

    const users = [
        { username: "", password: "" },
        { username: "", password: ""},
    ];
    
    for (const user of users) {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
    };
    
    await knex<Admin>("admin").insert(users);


    const categories = [
        '買餸','生果','日式超巿','百佳','屈臣氏或萬寧','オーの早餐','オーの午餐','オーの車費',
    'エディスの早餐','エディスの午餐','エディスの車費','下午茶','麵包','雪糕','零食',
    '買衫','交租','交差餉','オーの交稅','エディスの交稅','交電費','交水費','交煤氣費','電話費','上網費','電視費',
    '買電器','停車場費','家庭用品','交銀行費','娛樂','學費','オーの學費','維修費',
    '車輛開支','車保','オーの綱購','エディスの網購','オーの醫療費','エディスの醫療費',
    'オーの醫療保費','エディスの醫療保費','家人の醫療保費','オーの其他保費','エディスの其他保費','家用',
    '旅行(機票或酒店)','旅行(其他)','節日特別開支','オーの其他(一)','オーの其他(二)','エディスの其他(一)','エディスの其他(二)'];

    for (const category of categories ) {
        await knex("expense_category").insert({category_name: category});
    };

};
