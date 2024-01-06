export interface CashRegister{
    name: string,
    user: any,
    open_date: Date,
    initial_balance: number,
    total_income: number,
    value_exit?: number,
    value_final: number
}