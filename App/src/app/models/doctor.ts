import { Person,Address } from './person';


export interface Schedule {
  day: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  start: string;
  end: string;
}

export interface Doctor extends Person {
  id: number;
  speciality: "Pediatrician" | "Gynecologist" | "Cardiologist" | "Dermatologist" | "Psychiatrist" | "Neurologist" | "Radiologist" | "Dentist" | "Surgeon";
  schedule: Schedule[];
  clinicId: { _address:Address, _specilization:string, _id:number} ;}
