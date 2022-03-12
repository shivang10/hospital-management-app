import {gql} from "@apollo/client";

export const PATIENT_APPOINTMENTS = gql`
    query Query($id: String!, $userType: String!) {
        userAppointments(id: $id, userType: $userType) {
            doctorId
            doctorName
            patientName
            day
            time
            problem
            date
        }
    }
`;