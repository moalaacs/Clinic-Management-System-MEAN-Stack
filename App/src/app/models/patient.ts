import { Person } from './person';
import { Invoices } from './person';

export interface Patient extends Person {
  id: number;
  medicalHistory: string;
  invoices: Invoices[];
}
