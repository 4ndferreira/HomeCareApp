import { Controller, Route, Tags, Get, Post, Put, Delete, Path, Body, SuccessResponse, Response as TsoaResponse } from "tsoa";
import { AddressService } from "../services/AddressService.js";
import { GetAddressResponse } from "../models/address/dtos/GetAddressResponse.js";
import { AddressRequest } from "../models/address/dtos/AddressRequest.js";
import { CreateResponse } from "../models/shared/CreateResponse.js";
import { injectable } from "tsyringe";

@injectable()
@Route("addresses")
@Tags("Addresses")
export class AddressController extends Controller {
  constructor(private addressService: AddressService) {
    super()
  }
  /**
   * @summary Busca por todos os endereços cadastrados na base
   * @returns Retorna todos os endereços e seus dados
   */
  @Get("/")
  public async getAllAddresses(): Promise<GetAddressResponse[]> {
    const addresses = await this.addressService.getAllAddresses();
    return addresses;
  }
  /**
   * @summary Busca por um endereço pelo seu ID
   * @returns Exibe os dados do endereço
   */
  @Get("/{id}")
  @TsoaResponse<null>(404, "Address not found")
  public async getAddressById(@Path() id: number): Promise<GetAddressResponse> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid address id: ${id}`);
    }
    const address = await this.addressService.getAddressById(id);
    if (!address) {
      this.setStatus(404);
      throw new Error("Address not found");
    }

    return address;
  }
  /**
   * @summary Cria um novo endereço
   * @returns Retorna o ID do endereço cadastrado
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createAddress(@Body() data: AddressRequest): Promise<CreateResponse> {
    const newAddress = await this.addressService.createAddress(data);
    this.setStatus(201);
    return { id: newAddress.id };
  }
  /**
   * @summary Atualiza um endereço pelo ID
   */
  @Put("/{id}")
  @SuccessResponse("204", "No Content")
  @TsoaResponse<null>(404, "Address not found")
  public async updateAddress(
    @Path() id: number,
    @Body() data: AddressRequest
  ): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid address id: ${id}`);
    }
    const updated = await this.addressService.updateAddress(id, data);
    if (!updated) {
      this.setStatus(404);
      throw new Error(`There is no address associated with id ${id}.`);
    }
    this.setStatus(204);
  }
  /**
   * @summary Remove o registro de um endereço da base
   */
  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @TsoaResponse<null>(404, "Address not found")
  public async removeAddress(@Path() id: number): Promise<void> {
    if (isNaN(id)) {
      this.setStatus(400);
      throw new Error(`Invalid user id: ${id}`);
    }

    const deleted = await this.addressService.deleteAddress(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error(`There is no address associated with id ${id}.`);
    }
    this.setStatus(204);
  }
}
