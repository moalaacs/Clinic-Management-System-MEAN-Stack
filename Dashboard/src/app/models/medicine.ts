export class Medicine {
    constructor(public _id: number,
        public _name: string,
        public _productionDate: string,
        public _expiryDate: string,
        public _leaflet: string,
        public _pricePerUnit: number,
        public _quantity: number) {

    }
}

export interface PrescriptionMedicine{
    name: String,
    dose: String,
    frequency: String,
    type:'syrup'| 'tablet'| 'capsule'
  }

