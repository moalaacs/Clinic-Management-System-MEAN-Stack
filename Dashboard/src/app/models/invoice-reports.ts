export class Invoice {
  constructor(
    public _id: string,
    public patient_Id: number,
    public clinic_Id: { _contactNumber: string, _specilization: string },
    public total: number,
    public date: string,
    public paymentMethod: string,
    public paid: number,
    public totalDue: number,
    public status: string
  ) {
  }
}
