import React from "react";

import {DoctorAppointmentInterface} from "./doctorAppointmentInterface";

const UpcomingAppointments: React.FC<DoctorAppointmentInterface> = ({
    date, id, time,
    day, patientName, problem
}) => {
    return (
        <div>
            Upcoming Appointment
            Reference Id: {id}
            Patient Name: {patientName}
            Problem: {problem}
            Date: {date}
            Time: {time}
            Day: {day}
        </div>
    );
};

export default UpcomingAppointments;
