import {gql} from "@apollo/client";

export const PATIENT_APPOINTMENTS = gql`
    query User($username: String!, $password: String!) {
        userLogin(username: $username, password: $password) {
            user{
                id
                appointments {
                    id
                    doctorId
                    date
                    time
                    departmentId
                }
            }
        }
    }
`;