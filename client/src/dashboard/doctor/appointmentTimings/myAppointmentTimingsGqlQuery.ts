import {gql} from "@apollo/client";

export const MY_APPOINTMENT_TIMINGS = gql`
    query DepartmentDoctorsTimings($ids: [String!]) {
        departmentDoctorsTimings(ids: $ids) {
            doctorId
            appointmentTimings
        }
    }
`;