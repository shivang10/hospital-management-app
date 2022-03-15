import {gql} from "@apollo/client";

export const DOCTOR_APPOINTMENTS = gql`
    query Query($id: String!, $userType: String!) {
        userAppointments(id: $id, userType: $userType) {
            doctorId
            patientId
            doctorName
            patientName
            day
            time
            problem
            date
            id
        }
    }
`;