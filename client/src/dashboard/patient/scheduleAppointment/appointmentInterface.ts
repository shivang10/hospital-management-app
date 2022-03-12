export interface AvailableAppointmentInterface {
    day: string,
    time: string,
    slots: number
}

export interface AppointmentSelectionInterface {
    id: string,
    appointmentClicked: (data: AvailableAppointmentInterface) => void,
}