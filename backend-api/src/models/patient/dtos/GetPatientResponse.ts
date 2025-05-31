export interface GetPatientResponse {
  id: number;
  name: string;
  cpf: string;
  birthDate: Date;
  user: {
    id: number;
    name: string;
    urlImage?: string | null;
  }
}