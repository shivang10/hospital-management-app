import {gql} from "@apollo/client";

export const PATIENT_DETAILS = gql`
    query User($username: String!, $password: String!) {
        userLogin(username: $username, password: $password) {
            user{
                id
                name
                username
                age
                address
                phoneNumber
                careTakerName
                careTakerNumber
                gender
                weight
            }
        }
    }
`;