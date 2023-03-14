import { Person } from './person';
import { Invoices } from './person';

export interface Employee extends Person {
  id: number;
  clinic: number;
  monthlyRate: number;
  workingHours: number;
  role: "receptionist" | "nurse";
  medicalHistory: string;
  invoices: Invoices[];
}
