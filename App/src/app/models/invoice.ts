export interface Services{
    name:string,
    additionalCosts:number,
    notes:string
}
export interface Invoice{
    _id:string,
    patientId:number,
    patientType: "patient"| "doctor" | "employee",
    clinicId:number,
    services:Services[],
    total:number,
    date:Date,
    paymentMethod:"cash" | "credit" | "insurance",
    paid:number,
    totalDue:number,
    status:"paid" | "unpaid" | "partial"
}