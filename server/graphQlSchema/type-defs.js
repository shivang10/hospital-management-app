import {gql} from "apollo-server"

const typeDefs = gql`
    type User{
        id:ID!
        name:String!
        username:String!
        password:String!
        age:Int!
    }

    type Query{
        users: [User!]!
        user(username: String!, password:String!): User!
    }

    type Mutation{
        createUser(input: CreateUserInput!): User
    }
    input CreateUserInput{
        name:String!
        username:String!
        password:String!
        age:Int!
    }
`
export {typeDefs}