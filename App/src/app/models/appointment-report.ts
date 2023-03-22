export class Appointment {
  constructor(
    public _id: string,
    public _clinicId: {_contactNumber:String,_specilization:String},
    public _patientId: number,
    public _doctorId: {firstname:String,lastname:String},
    public _date: string,
    public _time: string,
    public _status: string,
  ) {
  }
}
