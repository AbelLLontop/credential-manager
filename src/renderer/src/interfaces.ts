export interface Credential {
  username: string;
  password: string;
  id: string | number;
  title: string;
}
export type ResponseReadFile = {
  route: string;
  success: boolean;
  data?: Credential[];
  message?: string;
}
