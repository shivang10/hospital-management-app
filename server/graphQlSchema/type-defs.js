const {gql} = require("apollo-server");

const typeDefs = gql`
    type User{
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
        domain: String
    }
    
    type Department {
        id: ID
        departmentName: String!
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

    type Query{
        users: [User!]!
        user(username: String!): User!
        doctors: [Doctor!]!
        doctor(username: String!): Doctor!
        departments: [Department!]!
    }

    type Mutation{
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!): User
        createDoctor(input: CreateDoctorInput!): Doctor
        updateDoctor(input: UpdateDoctorInput!): Doctor
        createDepartment(input: CreateDepartmentInput!): Department
        updateDepartment(input: UpdateDepartmentInput!): Department        
    }
    
    input CreateUserInput{
        name:String!
        username:String!
        password:String!
        age:Int!
    }
    
    input UpdateUserInput{
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
    
    input UpdateDoctorInput{
        id: ID!
        name: String
        username: String
        password: String
        age: Int
        address: String
        phoneNumber: Int
        gender: Gender
        speciality: String
        domain: String
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
