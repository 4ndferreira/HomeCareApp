import { GetUserResponse } from "../dtos/GetUserResponse.js";
import { User } from "../entities/User.js";

export function toGetUserResponse(user: User): GetUserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    cpf: user.cpf,
    urlImage: user.urlImage ?? null,
    isPatient: user.isPatient,
  };
}