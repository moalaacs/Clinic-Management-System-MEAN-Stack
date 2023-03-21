import { PrescriptionMedicine } from './medicine';

export class Prescription {
  constructor(
    public _id: number,
    public clinicRef: number,
    public patientRef: number,
    public doctorRef: number,
    public medications: PrescriptionMedicine[],
    public instructions: string,
    public date: string
  ) {}
}
