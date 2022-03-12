import React from "react";

import {PatientAppointmentInterface} from "./patientAppointmentInterface";

const PastAppointments: React.FC<PatientAppointmentInterface> = ({doctorId, date, id, departmentId, time}) => {
    return (
        <div>
            Past Appointment
            Reference Id: {id}
            Doctor: {doctorId}
            Date: {date}
            Time: {time}
            Department: {departmentId}
        </div>
    );
};

export default PastAppointments;
