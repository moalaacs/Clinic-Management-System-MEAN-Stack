import { Address, Person } from './person';

export interface Employee extends Person {
  id: number;
  clinicId: { _address:Address, _specilization:string, _id:number} ;
  salary: number;
  workingHours: number;
  role: "receptionist" | "nurse";
}
