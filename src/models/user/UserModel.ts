export interface User {
  id?: number;
  cpf: string;
  name: string;
  surname: string;
  sex: string;
  rg: string;
  email: string;
  phone: string;
  companionName?: string;
  birthDate: Date;
  responsiblePersonName?: string;
  responsiblePersonDocument?: string;
  responsiblePersonPhone?: string;
  cep: string;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  allergies?: string;
  medicines?: string;
  payment?: string;
  paymentDate?: Date;
  paymentCode?: string;
  checkinDate?: Date;
  checkoutDate?: Date;
};

export type getUserMainInfoInput = Pick<
  User,
  | "id"
  | "cpf"
  | "name"
  | "surname"
  | "sex"
  | "rg"
  | "email"
  | "phone"
  | "birthDate"
  | "cep"
  | "street"
  | "houseNumber"
  | "neighborhood"
  | "city"
  | "state"
>;
