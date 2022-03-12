import {gql} from "@apollo/client";

export const DOCTOR_TIMINGS = gql`
    query DOCTOR($id: ID!){
        doctorDetails(id: $id) {
            name
            id
            appointmentTimings
        }
    }
`;