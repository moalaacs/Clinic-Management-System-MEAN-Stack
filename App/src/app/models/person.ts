interface Address {
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
    fname: string;
    lname: string;
    dateOfBirth: string;
    age: number;
    gender: string;
    contactNumber: string;
    email: string;
    address: Address;
    password: string;
    image: string;
  }