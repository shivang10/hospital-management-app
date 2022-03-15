import React, {useState} from "react";

import {useQuery} from "@apollo/client";

import {SelectedDepartmentInterface} from "./appointmentInterface";
import AppointmentSelection from "./appointmentSelection";
import {DepartmentInterface} from "./departmentInterface";
import {DEPARTMENT_LIST} from "./departmentListGqlQuery";


const ScheduleAppointment: React.FC = () => {

    const {data, loading, error} = useQuery(DEPARTMENT_LIST);
    const [selectedDepartmentDetails, updateSelectedDepartmentDetails] = useState<SelectedDepartmentInterface>({
        id: "",
        departmentName: "",
        departmentDoctors: []
    });

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const handleSlotSelection = () => {
        console.log("selection");
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const clickedDepartmentId = event.target.value;
        const selectedDepartment = data?.departments.filter((department: DepartmentInterface) =>
            department.id === clickedDepartmentId);
        updateSelectedDepartmentDetails(selectedDepartment[0]);
    };

    const departmentOptions = data?.departments.map((department: DepartmentInterface) => {
        return <option
            key={department.id}
            value={department.id}>
            {department.departmentName}
        </option>;
    });

    return (
        <div>
            <h3 className="appointment-heading">Schedule Appointment</h3>
            <select onChange={handleChange}>{departmentOptions}</select>
            {selectedDepartmentDetails.id !== "" &&
                <AppointmentSelection
                    key={selectedDepartmentDetails.id}
                    id={selectedDepartmentDetails.id}
                    departmentDoctors={selectedDepartmentDetails["departmentDoctors"]}
                    appointmentClicked={handleSlotSelection}
                />
            }
        </div>
    );
};

export default ScheduleAppointment;
