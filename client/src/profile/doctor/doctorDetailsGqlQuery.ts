import {gql} from "@apollo/client";

export const UPDATE_DOCTOR_DETAILS = gql`
    mutation Mutation($input: UpdateDoctorInput!, $password: String!) {
        updateDoctor(input: $input, password: $password) {
            age
            address
            phoneNumber
            gender
        }
    }
`;

export const GET_DOCTOR_DETAILS = gql`
    query Query($username: String!, $password: String!) {
        doctorLogin(username: $username, password: $password) {
            doctor {
                name
                username
                age
                address
                phoneNumber
                gender
            }
        }
    }
`;