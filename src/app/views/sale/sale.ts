interface receivedPayment {
    type: string,
    value: number
}
export interface Process {
    num: number;
    name: string;
    actived: boolean;
}
export interface Item {
    type: string,
    value: number,
    idEntity: string,
    nameEntity: string,
    discount: string,
    quantity: number,
    valueDiscount: string,
    obs: string,
    start_date?: Date | string
    end_date?: Date | string
}
export interface Sale {
    idClient: string
    code: string
    itens: Item[]
    amount: number
    totalDiscount: number
    received: receivedPayment[]
    totalReceived: number
    hasOutstandingBalance: boolean
    valueOutstandingBalance: number
    datePaymentOutstandingBalance: Date
}

export interface SalesReceipt {
    codeSale: string
    dateSale: Date
    client: string
    valueSale: string
    itens: Item[]
    received: receivedPayment[]
    totalReceived: number
}