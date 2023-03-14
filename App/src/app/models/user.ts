export interface User {
  id: number;
  idInSchema: number;
  role: "admin" | "patient" | "doctor" | "employee";
  email: string;
  contactNumber: string;
  forClinic: number;
  password: string;
}
