import { Address } from "../entities/Address.js";
import { GetAddressResponse } from "../dtos/GetAddressResponse.js";

export function toGetAddressResponse(address: Address): GetAddressResponse {
  return {
    id: address.id,
    street: address.street,
    number: address.number,
    complement: address.complement ?? null,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
  };
}
