import {gql} from "@apollo/client";

export const AUTH_USER = gql`
    query User($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            username
        }
    }
`;