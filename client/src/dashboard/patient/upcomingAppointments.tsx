import React from "react";

import {PatientAppointmentInterface} from "./patientAppointmentInterface";

const UpcomingAppointments: React.FC<PatientAppointmentInterface> = ({
    date, id, departmentId, time,
    day, doctorName, problem
}) => {
    return (
        <div>
            Upcoming Appointment
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

export default UpcomingAppointments;
