export interface Service{
    id?: string
    title: string
    description: string
    amount: number
    create_at?: Date
    user_id?: string
    code: string
    active: boolean
}