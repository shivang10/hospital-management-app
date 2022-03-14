import React from "react";

import {PatientAppointmentInterface} from "./patientAppointmentInterface";

const PastAppointments: React.FC<PatientAppointmentInterface> = ({
    date, id, departmentId, time,
    day, doctorName, problem,
}) => {
    return (
        <tr>
            <td>{id} </td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{departmentId}</td>
            <td>{day}</td>
            <td>{doctorName}</td>
            <td>{problem}</td>
        </tr>
    );
};

export default PastAppointments;
