export interface GetUserResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  urlImage?: string | null;
  isPatient: boolean
}