import { SexInterface } from "@models/sex/SexInterface";
import { ChurchInterface } from "@models/church/ChurchInterface";
import { PaymentInterface } from "@models/payment/PaymentInterface";
import { TicketInterface } from "@models/ticket/TicketInterface";

export interface UserInterface {
  id: number;
  cpf: string;
  name: string;
  surname: string;
  sex: SexInterface;
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
  church: ChurchInterface;
  allergies: string;
  medicines: string;
  payment: PaymentInterface;
  paymentDate: Date | null;
  paymentCode: string;
  checkinDate: Date | null;
  checkoutDate: Date | null;
  ticket: TicketInterface;
  daily: string;
}