export interface IClinic {
  _id: number,
  _specilization: string,
  _contactNumber: string,
  _address: { street: string, city: string, country: string, zipCode: number },
  _weeklySchedule: {
    day: string,
    start: string,
    end: string,
    doctorId: {
      firstname: string,
      lastname: string,
    }
  }[],
  _doctors: number[];
}
