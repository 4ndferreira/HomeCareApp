export interface GetCaregiverResponse {
  id: number;
  corenNumber: string;
  biography: string;
  rating?: number;
  user: {
    id: number;
    name: string;
    urlImage?: string | null
  }
}