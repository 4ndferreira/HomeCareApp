import { singleton } from "tsyringe";
import { GetAddressResponse } from "../models/address/dtos/GetAddressResponse.js";
import { Address } from "../models/address/entities/Address.js";
import { AddressRepository } from "../repositories/AddressRepository.js";
import { toGetAddressResponse } from "../models/address/mappers/toGetAddressResponse.js";

@singleton()
export class AddressService {
  constructor(private repository: AddressRepository) {}

  async getAllAddresses(): Promise<GetAddressResponse[]> {
    const addresses = await this.repository.findAll();

    return addresses.map((address) => toGetAddressResponse(address));
  }

  async getAddressById(id: number): Promise<GetAddressResponse | null> {
    const address = await this.repository.findOne({ where: { id } });
    if (!address) return null;

    return toGetAddressResponse(address);
  }

  async createAddress(addressData: Partial<Address>): Promise<Address> {
    return this.repository.createAndSave(addressData);
  }

  async updateAddress(id: number, addressData: Partial<Address>): Promise<boolean> {
    return this.repository.update(id, addressData);
  }

  async deleteAddress(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
