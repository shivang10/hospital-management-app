const {gql} = require("apollo-server");

const typeDefs = gql`
    type User {
        id:ID!
        name:String!
        username:String
        age:Int
        address: String
        phoneNumber: Int
        careTakerName: String
        careTakerNumber: Int
        gender: Gender
        weight: Int
        identityProof: IdentityProofType
        diagnosedWith: [String]
        appointments: [userAppointment]
    }
    
    type userAppointment {
        id: ID!
        doctorId: String
        date: String
        time: String
        departmentId: String
    }
    
    type Doctor {
        id: ID!
        name: String!
        username: String
        password: String
        age: Int
        address: String
        phoneNumber: Int
        gender: Gender
        speciality: String
        department: String
        appointmentTimings: [doctorAppointmentTimings]
        scheduledAppointment: [doctorScheduledAppointments]
    }
    
    type DoctorViewAppointments {
        id: ID!
        name: String!
        scheduledAppointment: [doctorScheduledAppointments]
    }
    
    type doctorAppointmentTimings {
        availableDay: String
        availableTime: String
    }
    
    type doctorScheduledAppointments {
        id: ID
        patientId: String
        charges: String
        date: String
        time: String
    }
    
    type Department {
        id: ID
        departmentName: String!
        departmentHead: String
        departmentDoctors: [String]
        departmentFacilities: [String]
    }
    
    type DepartmentDetails {
        id: ID!
        departmentName: String
        departmentHead: String
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

    type Query {
        users: [User!]!
        user(username: String!): User!
        userBookAppointment(id: ID!): User!
        doctors: [Doctor!]!
        doctor(username: String!): Doctor!
        doctorViewAppointments(id: ID!): Doctor!
        departments: [Department!]!
        departmentDetails(input: DepartmentDetails!): Department!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!, password: String!): User
        createDoctor(input: CreateDoctorInput!): Doctor
        updateDoctor(input: UpdateDoctorInput!, password: String!): Doctor
        doctorAppointmentTimings(input: DoctorAppointmentTimings): Doctor
        createDepartment(input: CreateDepartmentInput!): Department
        updateDepartment(input: UpdateDepartmentInput!): Department        
    }
    
    input DepartmentDetails {
        id: ID!
    }
    
    input CreateUserInput {
        name:String!
        username:String!
        password:String!
        age:Int!
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
        id: ID!
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
    
    input DoctorAppointmentTimings {
        id: ID!
        availableDay: String!
        availableTime: String!
    }
    
    input CreateDepartmentInput {
        departmentName: String!
        departmentHead: String
        departmentDoctors: [String]
        departmentFacilities: [String]
    }
    
    input UpdateDepartmentInput {
        id: ID!
        departmentName: String
        departmentHead: String
        departmentDoctors: [String]
        departmentFacilities: [String]
    }

    input IdentityProofInput {
        id: ID!
        data: String
        contentType: String
    }
`;

module.exports = typeDefs;
