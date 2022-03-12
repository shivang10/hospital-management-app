import {gql} from "@apollo/client";

export const DEPARTMENT_LIST = gql`
    query Departments {
        departments {
            id
            departmentName
            departmentDoctors
        }
    }
`;