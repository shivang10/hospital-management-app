import React from "react";

import {useQuery} from "@apollo/client";

import {AppointmentSelectionInterface, AvailableAppointmentInterface} from "./appointmentInterface";
import {availableAppointments} from "./availableAppointments";
import {DOCTOR_TIMINGS} from "./doctorDetailsGqlQuery";

const AppointmentSelection: React.FC<AppointmentSelectionInterface> = ({
    appointmentClicked, departmentDoctors
}) => {

    const {data, loading, error} = useQuery(DOCTOR_TIMINGS, {
        variables: {ids: departmentDoctors}
    });

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    const handleAppointmentClicked = (data: AvailableAppointmentInterface) => {
        appointmentClicked(data);
    };

    const doctorAvailableAppointments = (appointments: any) => {
        return Object.keys(appointments)
            .filter((appointmentDay) => {
                const currentDateTime = new Date();
                const currentDay = currentDateTime.getDay();
                const availableAppointmentDays = availableAppointments[currentDay];
                return !!availableAppointmentDays.includes(appointmentDay);
            })
            .map((appointmentDay) => {
                const daySlots = Object.keys(appointments[appointmentDay])
                    .filter((appointmentDayTime) => appointments[appointmentDay][appointmentDayTime] > 0)
                    .map((appointmentDayTime) => {
                        return (
                            <td key={appointmentDayTime}>
                                {appointmentDayTime}
                            </td>
                        );
                    });
                return (
                    <tr key={appointmentDay}>
                        <td>{appointmentDay}</td>
                        {daySlots}
                    </tr>
                );
            });
    };

    const availableDoctors = data?.departmentDoctorsTimings
        .map((doctor: AvailableAppointmentInterface) => {
            const allAppointments = doctorAvailableAppointments(JSON.parse(doctor["appointmentTimings"]));
            return <div
                onClick={() => handleAppointmentClicked(doctor)}
                key={doctor["doctorId"]}>
                <table className="simple-table">
                    <thead>
                        <tr>
                            <th>{doctor["doctorName"]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAppointments}
                    </tbody>
                </table>
            </div>;
        });

    return (
        <div>
            Appointment Selection
            {availableDoctors}
        </div>
    );
};

export default AppointmentSelection;
