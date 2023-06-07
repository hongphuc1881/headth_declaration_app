export interface IForm {
    id: string;
    fullName: string;
    object: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    nationalID: string;
    travels: ITravels[];
    province: string;
    district: string;
    address: string;
    email: string;
    mobile: string;
    symptoms: string[];
    vaccines: string;
}
export interface ITravels {
    departureDate: string;
    immigrationDate: string;
    departure: string;
    destination: string;
}
