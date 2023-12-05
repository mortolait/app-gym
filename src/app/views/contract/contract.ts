export interface Contract {
    id: string;
    description: string;
    code: string;
    installments: number;
    active: boolean;
    amount: number;
    amount_per_installment: number;
    create_at: Date;
    user_id: string;
}
export interface Contracts{
    items: Contract[]
}