import {gql} from "@apollo/client";

export const DOCTOR_TIMINGS = gql`
    query DepartmentDoctorsTimings($ids: [String!]) {
        departmentDoctorsTimings(ids: $ids) {
            doctorId
            doctorName
            appointmentTimings
        }
    }
`;