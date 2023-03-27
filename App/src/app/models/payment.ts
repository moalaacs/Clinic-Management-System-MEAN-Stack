export interface Payment {
    id:string
    amount:number,
    card_number:string,
    exp_month:number,
    exp_year:number,
    cvc:number,
}