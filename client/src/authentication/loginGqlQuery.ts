import {gql} from "@apollo/client";

export const AUTH_USER_LOGIN = gql`
    query User($username: String!, $password: String!) {
        userLogin(username: $username, password: $password) {
            token
        }
    }
`;

export const AUTH_DOCTOR_LOGIN = gql`
    query Doctor($username: String!, $password: String!) {
        doctorLogin(username: $username, password: $password) {
            token
        }
    }
`;
