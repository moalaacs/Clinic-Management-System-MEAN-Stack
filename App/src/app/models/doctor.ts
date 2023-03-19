import { Person } from './person';


export interface Schedule {
  day: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  start: string;
  end: string;
}

export interface Doctor extends Person {
  id: number;
  specilization: "Pediatrician" | "Gynecologist" | "Cardiologist" | "Dermatologist" | "Psychiatrist" | "Neurologist" | "Radiologist" | "Dentist" | "Surgeon";
  schedule: Schedule[];
  clinic: number;
}