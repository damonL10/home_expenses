export interface Bill {
    id: number;
    category_name?: string;
    amount?: number;
}

export interface Admin {
    id: number;
    username: string;
    password: string;
}

export interface Expense {
    id : number;
    category_id_1:number;
    updated_at : Date
}

export interface Monthly_record {
    category_name: string;
    sub_total: number;
}