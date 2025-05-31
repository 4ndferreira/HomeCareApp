import { GetPatientResponse } from "../dtos/GetPatientResponse.js";
import { Patient } from "../entities/Patient.js";

export function toGetPatientResponse(patient: Patient): GetPatientResponse {
  return {
    id: patient.id,
    name: patient.name,
    cpf: patient.cpf,
    birthDate: patient.birthDate,
    user: {
      id: patient.user.id,
      name: patient.user.name,
      urlImage: patient.user.urlImage ?? null,
    }
  };
}
 