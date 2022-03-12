import {PatientAppointmentInterface} from "./patientAppointmentInterface";

const getCurrentDate = () => {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${date}-${month}-${year}`;
};

export const processPastAppointmentData = (appointments: PatientAppointmentInterface[]) => {
    const currentDate = getCurrentDate();
    return appointments.filter((appointment: PatientAppointmentInterface) =>
        appointment.date < currentDate);
};

export const processUpcomingAppointmentData = (appointments: PatientAppointmentInterface[]) => {
    const currentDate = getCurrentDate();
    return appointments.filter((appointment: PatientAppointmentInterface) =>
        appointment.date >= currentDate);
};