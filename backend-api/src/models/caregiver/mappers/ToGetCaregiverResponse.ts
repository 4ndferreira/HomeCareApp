import { GetCaregiverResponse } from "../dtos/GetCaregiverResponse.js";
import { Caregiver } from "../entities/Caregiver.js";

export default function toGetCaregiverResponse(
  caregiver: Caregiver
): GetCaregiverResponse {
  return {
    id: caregiver.id,
    corenNumber: caregiver.corenNumber,
    biography: caregiver.biography,
    user: {
      id: caregiver.user.id,
      name: caregiver.user.name,
      urlImage: caregiver.user.urlImage ?? null
    },
  };
}