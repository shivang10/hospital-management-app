import React from "react";

import {PatientAppointmentInterface} from "./patientAppointmentInterface";

const UpcomingAppointments: React.FC<PatientAppointmentInterface> = ({doctorId, date, id, departmentId, time}) => {
    return (
        <div>
            Upcoming Appointment
            Reference Id: {id}
            Doctor: {doctorId}
            Date: {date}
            Time: {time}
            Department: {departmentId}
        </div>
    );
};

export default UpcomingAppointments;
