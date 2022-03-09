import {gql} from "@apollo/client";

export const UPDATE_PATIENT_DETAILS = gql`
    mutation Mutation($input: UpdateUserInput!, $password: String!) {
        updateUser(input: $input, password: $password) {
            name
            age
            address
            phoneNumber
            careTakerName
            careTakerNumber
            gender
            weight
        }
    }
`;