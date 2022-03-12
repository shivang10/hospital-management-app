import React from "react";

import {useQuery} from "@apollo/client";

import {AppointmentSelectionInterface, AvailableAppointmentInterface} from "./appointmentInterface";
import {DOCTOR_TIMINGS} from "./doctorDetailsGqlQuery";

const AppointmentSelection: React.FC<AppointmentSelectionInterface> = ({id, appointmentClicked}) => {

    const {data, loading, error} = useQuery(DOCTOR_TIMINGS, {
        variables: {id}
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

    const availableAppointments = data.doctorDetails
        .filter((availableAppointment: AvailableAppointmentInterface) => availableAppointment["slots"] > 0)
        .map((availableAppointment: AvailableAppointmentInterface) => {
            return <div
                onClick={() => handleAppointmentClicked(availableAppointment)}
                key={availableAppointment["slots"]}>
                Day: {availableAppointment["day"]}
                Time: {availableAppointment["time"]}
            </div>;
        });

    return (
        <div>
            Appointment Selection
            {availableAppointments}
        </div>
    );
};

export default AppointmentSelection;
