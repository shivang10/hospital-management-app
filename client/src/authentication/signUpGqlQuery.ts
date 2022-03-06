import {gql} from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input) {
            name
        }
    }
`;

export const CREATE_DOCTOR_MUTATION = gql`
    mutation createDoctor($input: CreateDoctorInput!){
        createUser(input: $input) {
            name
        }
    }
`;
