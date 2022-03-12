import {DoctorAppointmentInterface} from "./doctorAppointmentInterface";

const getCurrentDate = () => {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${date}-${month}-${year}`;
};

export const processPastAppointmentData = (appointments: DoctorAppointmentInterface[]) => {
    const currentDate = getCurrentDate();
    return appointments.filter((appointment: DoctorAppointmentInterface) =>
        appointment.date < currentDate);
};

export const processUpcomingAppointmentData = (appointments: DoctorAppointmentInterface[]) => {
    const currentDate = getCurrentDate();
    return appointments.filter((appointment: DoctorAppointmentInterface) =>
        appointment.date >= currentDate);
};