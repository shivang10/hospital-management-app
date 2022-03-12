import React from "react";

import {PatientAppointmentInterface} from "./patientAppointmentInterface";

const PastAppointments: React.FC<PatientAppointmentInterface> = ({
    date, id, departmentId, time,
    day, doctorName, problem,
}) => {
    return (
        <div>
            Past Appointment
            Reference Id: {id}
            Date: {date}
            Time: {time}
            Department: {departmentId}
            Day: {day}
            Doctor Name: {doctorName}
            Problem: {problem}
        </div>
    );
};

export default PastAppointments;
