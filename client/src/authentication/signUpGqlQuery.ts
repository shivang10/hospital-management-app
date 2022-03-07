import {gql} from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input) {
            token
            user {
                id
                name
                username
            }
        }
    }
`;

export const CREATE_DOCTOR_MUTATION = gql`
    mutation CreateDoctor($input: CreateDoctorInput!){
        createDoctor(input: $input) {
            token
            doctor {
                id
                name
                username
            }
        }
    }
`;
