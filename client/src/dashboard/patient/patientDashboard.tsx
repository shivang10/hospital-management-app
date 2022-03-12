import React from "react";

import {useQuery} from "@apollo/client";

import {getUserDetails} from "../../utils/tokenDetails";
import PastAppointments from "./pastAppointments";
import {PatientAppointmentInterface} from "./patientAppointmentInterface";
import {PATIENT_APPOINTMENTS} from "./patientAppointmentsGqlQuery";
import {processPastAppointmentData, processUpcomingAppointmentData} from "./processAppointmentData";
import ScheduleAppointment from "./scheduleAppointment/scheduleAppointment";
import UpcomingAppointments from "./upcomingAppointments";


const PatientDashboard: React.FC = () => {
    const {id} = getUserDetails();

    const patientAppointments = useQuery(PATIENT_APPOINTMENTS, {
        variables: {
            id: id,
            userType: "patient"
        }
    });

    if (patientAppointments.loading) {
        return <div>Loading</div>;
    }
    if (patientAppointments.error) {
        return <div>Error Dashboard</div>;
    }

    const data = patientAppointments.data?.userAppointments;
    const allUpcomingAppointments = processUpcomingAppointmentData(data)
        .map((appointment: PatientAppointmentInterface) => {
            return <UpcomingAppointments
                key={appointment.id}
                date={appointment.date}
                departmentId={appointment.departmentId}
                id={appointment.id}
                doctorId={appointment.doctorId}
                time={appointment.time}
                doctorName={appointment.doctorName}
                problem={appointment.problem}
                day={appointment.day}
            />;
        });

    const allPastAppointments = processPastAppointmentData(data)
        .map((appointment: PatientAppointmentInterface) => {
            return <PastAppointments
                key={appointment.id}
                date={appointment.date}
                departmentId={appointment.departmentId}
                id={appointment.id}
                doctorId={appointment.doctorId}
                time={appointment.time}
                doctorName={appointment.doctorName}
                problem={appointment.problem}
                day={appointment.day}
            />;
        });

    return (
        <div>
            Patient Dashboard
            <ScheduleAppointment/>
            {allUpcomingAppointments}
            {allPastAppointments}
        </div>
    );
};

export default PatientDashboard;
