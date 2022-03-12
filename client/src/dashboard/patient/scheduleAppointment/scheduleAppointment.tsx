import React, {useState} from "react";

import {useQuery} from "@apollo/client";

import AppointmentSelection from "./appointmentSelection";
import {DepartmentInterface} from "./departmentInterface";
import {DEPARTMENT_LIST} from "./departmentListGqlQuery";


const ScheduleAppointment: React.FC = () => {

    const {data, loading, error} = useQuery(DEPARTMENT_LIST);
    const [selectedDepartmentDoctors, updateSelectedDepartmentDoctors] = useState([]);

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
        updateSelectedDepartmentDoctors(selectedDepartment["departmentDoctor"]);
    };

    const departmentOptions = data?.departments.map((department: DepartmentInterface) => {
        return <option
            key={department.id}
            value={department.id}>
            {department.name}
        </option>;
    });

    const availableSlots = selectedDepartmentDoctors.map((currentDoctor: { id: string }) => {
        return <AppointmentSelection
            key={currentDoctor.id}
            id={currentDoctor.id}
            appointmentClicked={handleSlotSelection}
        />;
    });

    return (
        <div>
            Schedule Appointment
            <select onChange={handleChange}>{departmentOptions}</select>
            {selectedDepartmentDoctors && selectedDepartmentDoctors.length > 0 && availableSlots}
        </div>
    );
};

export default ScheduleAppointment;
