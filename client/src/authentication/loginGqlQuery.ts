import {gql} from "@apollo/client";

export const AUTH_USER = gql`
    query User($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            username
        }
    }
`;

export const AUTH_DOCTOR_LOGIN = gql`
    query Doctor($username: String!, $password: String!) {
        doctor(username: $username, password: $password) {
            username
        }
    }
`;