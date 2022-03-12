import React from "react";

import {DoctorAppointmentInterface} from "./doctorAppointmentInterface";

const PastAppointments: React.FC<DoctorAppointmentInterface> = ({
    date, id, time,
    day, patientName, problem,
}) => {
    return (
        <div>
            Past Appointment
            Reference Id: {id}
            Doctor Name: {patientName}
            Problem: {problem}
            Date: {date}
            Time: {time}
            Day: {day}
        </div>
    );
};

export default PastAppointments;
