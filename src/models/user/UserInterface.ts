import { SexInterface } from "@models/sex/SexInterface";
import { ChurchInterface } from "@models/church/ChurchInterface";
import { PaymentInterface } from "@models/payment/PaymentInterface";
import { TicketInterface } from "@models/ticket/TicketInterface";

export interface UserInterface {
  id: string;
  cpf: string;
  name: string;
  surname: string;
  sex: SexInterface;
  rg: string;
  email: string;
  phone: string;
  companionName: string | null;
  birthDate: Date;
  responsiblePersonName: string | null;
  responsiblePersonDocument: string | null;
  responsiblePersonPhone: string | null;
  cep: string;
  street: string;
  houseNumber: number;
  neighborhood: string;
  city: string;
  state: string;
  church: ChurchInterface;
  allergies: string;
  medicines: string;
  payment: PaymentInterface | null;
  paymentDate: Date | null;
  paymentCode: string | null;
  checkinDate: Date | null;
  checkoutDate: Date | null;
  ticket: TicketInterface;
  daily?: string | null;
}