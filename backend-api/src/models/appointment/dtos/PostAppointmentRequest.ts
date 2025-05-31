export interface PostAppointmentRequest {
  scheduledAt: Date,
  idPatient: number,
  idCaregiver: number,
  idAddress: number
}