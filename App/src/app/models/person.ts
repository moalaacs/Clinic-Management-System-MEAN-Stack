export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: number;
}


export interface Invoices {
  invoice_id: string;
  total: number;
  totalDue: number;
  status: string;
}

export interface Person {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
  address: Address;
  password: string;
  image: string | ArrayBuffer | null;
  medicalHistory: string;
  invoices: Invoices[];
}
