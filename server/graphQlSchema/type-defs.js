const {gql} = require("apollo-server");

const typeDefs = gql`
    scalar JSON
    scalar JSONObject

    type User {
        id:ID!
        name:String
        username:String
        password: String
        age:Int
        address: String
        phoneNumber: Int
        careTakerName: String
        careTakerNumber: Int
        gender: Gender
        weight: Int
        identityProof: IdentityProofType
        diagnosedWith: [String]
    }
    
    type Doctor {
        id: ID!
        name: String
        username: String
        password: String
        age: Int
        address: String
        phoneNumber: Int
        gender: Gender
        speciality: String
        department: String
    }
    
    type Department {
        id: ID
        departmentName: String!
        departmentDoctors: [String]
        departmentFacilities: [String]
    }
    
    enum Gender {
        Male
        Female
        Other
    }
    
    type IdentityProofType {
        id: ID!
        data: String
        contentType: String
    }
    
    type UserAuthPayload {
        token: String!
        user: User!
    }
    
    type DoctorAuthPayload {
        token: String!
        doctor: Doctor!
    }

    type DoctorsTimings {
        doctorId: String!
        doctorName: String!
        appointmentTimings: JSON
    }

    type ScheduledAppointment {
        doctorId: String!
        doctorName: String!
        patientId: String!
        patientName: String!
        day: String!
        time: String!
        problem: String!
        date: String!
    }

    type Query {
        userLogin(username: String!, password: String!): UserAuthPayload!
        doctorLogin(username: String!, password: String!): DoctorAuthPayload!
        departments: [Department!]!
        departmentDoctorsTimings(ids: [String!]):[DoctorsTimings!]
        userAppointments(id: String!, userType: String!): [ScheduledAppointment]
        departmentDetails(input: DepartmentDetails!): Department!
    }

    type Mutation {
        createUser(input: CreateUserInput!): UserAuthPayload
        updateUser(input: UpdateUserInput!, password: String!): User
        createDoctor(input: CreateDoctorInput!): DoctorAuthPayload
        updateDoctor(input: UpdateDoctorInput!, password: String!): Doctor
        createDepartment(input: CreateDepartmentInput!): Department
        updateDepartment(input: UpdateDepartmentInput!): Department
        scheduleAppointment(input: ScheduledAppointmentInput!): ScheduledAppointment
        updateAppointmentTimings(input: updateAppointmentTimingsInput): String  
    }
    
    input DepartmentDetails {
        id: ID!
    }
    
    input CreateUserInput {
        name:String!
        username:String!
        password:String!
    }
    
    input UpdateUserInput {
        id:ID!
        name:String
        username:String
        password:String
        age:Int
        address: String
        phoneNumber: Int
        careTakerName: String
        careTakerNumber: Int
        gender: Gender
        weight: Int
        identityProof: IdentityProofInput
    }
    
    input CreateDoctorInput {
        name: String!
        username: String!
        password: String!
    }
    
    input UpdateDoctorInput {
        id: ID!
        name: String
        username: String
        password: String
        age: Int
        address: String
        phoneNumber: Int
        gender: Gender
        speciality: String
        department: String
    }
    
    input CreateDepartmentInput {
        departmentName: String!
        departmentDoctors: [String]
        departmentFacilities: [String]
    }
    
    input UpdateDepartmentInput {
        id: ID!
        departmentName: String
        departmentDoctors: [String]
        departmentFacilities: [String]
    }

    input IdentityProofInput {
        id: ID!
        data: String
        contentType: String
    }

    input ScheduledAppointmentInput {
        doctorId: String!
        doctorName: String!
        patientId: String!
        patientName: String!
        day: String!
        time: String!
        problem: String!
        date: String!
    }
    input updateAppointmentTimingsInput {
        doctorId: String!
        day: String!
        time: String!
    }
`;

module.exports = typeDefs;
