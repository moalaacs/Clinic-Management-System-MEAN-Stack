export class Appointment {
  constructor(
    public _id: string,
    public _clinicId: number,
    public _patientId: number,
    public _doctorId: number,
    public _date: string,
    public _time: string,
    public _status: string,
  ) {
  }
}
