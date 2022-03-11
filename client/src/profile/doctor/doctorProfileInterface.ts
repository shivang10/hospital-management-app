export interface DoctorProfileInterface {
    name: string,
    age: number,
    address: string,
    phoneNumber: number,
    username: string,
    gender: string
}

export enum gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}