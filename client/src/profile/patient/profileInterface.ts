export interface PatientProfileInterface {
    name: string,
    age: number,
    address: string,
    phoneNumber: number,
    careTakerNumber: number,
    careTakerName: string,
    gender: string,
    weight: number,
}

export enum gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}