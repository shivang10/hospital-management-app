const {gql} = require("apollo-server");

const typeDefs = gql`
    type User{
        id:ID!
        name:String!
        username:String!
        password:String!
        age:Int!
        address: String
        phoneNumber: Number
        careTakerName: String
        careTakerNumber: Number
        gender: Gender
        weight: Number
        identityProof: IdentityProof
    }
    
    type Doctor {
        id: ID!
        name: String!
        username: String!
        password: String!
        age: Int!
        address: String!
        phoneNumber: Int!
        gender: Gender
        speciality: String!
        domain: String!
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
    }

    type Mutation{
        createUser(input: CreateUserInput!): User
        updateUser(input: UpdateUserInput!): User
        createDoctor(input: CreateDoctorInput!): Doctor
        updateDoctor(input: UpdateDoctorInput!): Doctor
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
        phoneNumber: Number
        careTakerName: String
        careTakerNumber: Number
        gender: Gender
        weight: Number
        weight: Number
        identityProof: IdentityProof
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
`;

module.exports = typeDefs;
