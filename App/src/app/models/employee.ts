import { Person } from './person';

export interface Employee extends Person {
  id: number;
  clinic: number;
  monthlyRate: number;
  workingHours: number;
  role: "receptionist" | "nurse";
}
