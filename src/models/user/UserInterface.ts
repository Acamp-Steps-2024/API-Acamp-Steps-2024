export interface UserInterface {
  id: number;
  cpf: string;
  name: string;
  surname: string;
  sex: UserSex;
  rg: string;
  email: string;
  phone: string;
  companionName: string;
  birthDate: Date;
  responsiblePersonName: string;
  responsiblePersonDocument: string;
  responsiblePersonPhone: string;
  cep: string;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  church: Church;
  allergies: string;
  medicines: string;
  payment: string;
  paymentDate: Date | null;
  paymentCode: string;
  checkinDate: Date | null;
  checkoutDate: Date | null;
  ticket: Ticket;
  daily: string;
}

export enum UserSex {
  "Masculino" = "Masculino",
  "Feminino" = "Feminino",
}

export enum Church {
  "Nenhuma" = "Nenhuma",
  "IEQ - Água Vermelha" = "IEQ - Água Vermelha",
  "IEQ - Azulville" = "IEQ - Azulville",
  "IEQ - Boa Vista" = "IEQ - Boa Vista",
  "IEQ - Botafogo" = "IEQ - Botafogo",
  "IEQ - Cruzeiro do Sul" = "IEQ - Cruzeiro do Sul",
  "IEQ - Descalvado" = "IEQ - Descalvado",
  "IEQ - Ibaté" = "IEQ - Ibaté",
  "IEQ - Itirapina" = "IEQ - Itirapina",
  "IEQ - Tangará" = "IEQ - Tangará",
  "IEQ - Jockey Club" = "IEQ - Jockey Club",
  "IEQ - Planalto Paraíso" = "IEQ - Planalto Paraíso",
  "IEQ - Ribeirão Bonito" = "IEQ - Ribeirão Bonito",
  "IEQ - Santa Felícia" = "IEQ - Santa Felícia",
  "IEQ - Vila Brasília" = "IEQ - Vila Brasília",
  "Outra" = "Outra",
}

export enum Ticket {
  "Acampante" = "Acampante",
  "Parcial" = "Parcial",
}
