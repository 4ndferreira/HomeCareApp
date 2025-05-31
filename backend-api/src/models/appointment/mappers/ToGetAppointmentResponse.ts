import { GetAppointmentResponse } from "../dtos/GetAppointmentResponse.js";
import { Appointment } from "../entities/Appointment.js";

export default function toGetAppointmentResponse(
  appointment: Appointment
): GetAppointmentResponse {
  return {
    id: appointment.id,
    scheduledAt: appointment.scheduledAt,
    status: appointment.status,
    patient: {
      name: appointment.patient.user.name,
      phoneNumber: appointment.patient.user.phoneNumber,
    },
    caregiver: {
      name: appointment.caregiver.user.name,
      phoneNumber: appointment.caregiver.user.phoneNumber,
    },
    address: {
      id: appointment.address.id,
      alias: appointment.address.alias
    },
  };
}
