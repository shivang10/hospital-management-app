import React from "react";

import {DoctorAppointmentInterface} from "./doctorAppointmentInterface";

const PastAppointments: React.FC<DoctorAppointmentInterface> = ({
    date, id, time,
    day, patientName, problem,
}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{day}</td>
            <td>{patientName}</td>
            <td>{problem}</td>
        </tr>
    );
};

export default PastAppointments;
