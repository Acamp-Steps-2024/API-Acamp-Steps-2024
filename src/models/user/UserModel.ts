import { SexInterface } from "@models/sex/SexInterface";
import { ChurchInterface } from "@models/church/ChurchInterface";
import { PaymentInterface } from "@models/payment/PaymentInterface";
import { TicketInterface } from "@models/ticket/TicketInterface";
import { UserInterface } from "./UserInterface";
export class User implements UserInterface{
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

  constructor(
    id: number,
    cpf: string,
    name: string,
    surname: string,
    sex: SexInterface,
    rg: string,
    email: string,
    phone: string,
    companionName: string,
    birthDate: Date,
    responsiblePersonName: string,
    responsiblePersonDocument: string,
    responsiblePersonPhone: string,
    cep: string,
    street: string,
    houseNumber: string,
    neighborhood: string,
    city: string,
    state: string,
    church: ChurchInterface,
    allergies: string,
    medicines: string,
    payment: PaymentInterface,
    paymentDate: Date | null,
    paymentCode: string,
    checkinDate: Date | null,
    checkoutDate: Date | null,
    ticket: TicketInterface,
    daily: string
  ) {
    this.id = id
    this.cpf = this.addCpfMask(cpf)
    this.name = this.setNameWithUppercase(name)
    this.surname = this.setNameWithUppercase(surname)
    this.sex = sex
    this.rg = this.addRgMask(rg)
    this.email = email
    this.phone = this.addPhoneMask(phone)
    this.companionName = this.setNameWithUppercase(companionName)
    this.birthDate = birthDate
    this.responsiblePersonName = this.setNameWithUppercase(responsiblePersonName)
    this.responsiblePersonDocument = this.addRgMask(responsiblePersonDocument)
    this.responsiblePersonPhone = this.addPhoneMask(responsiblePersonPhone)
    this.cep = this.addCepMask(cep)
    this.street = street
    this.houseNumber = houseNumber
    this.neighborhood = neighborhood
    this.city = city
    this.state = state
    this.church = church
    this.allergies = allergies
    this.medicines = medicines
    this.payment = payment
    this.paymentDate = paymentDate ? paymentDate : null
    this.paymentCode = paymentCode
    this.checkinDate = checkinDate ? checkinDate : null
    this.checkoutDate = checkoutDate ? checkoutDate : null
    this.ticket = ticket
    this.daily = daily
  }

  private setNameWithUppercase(name: string): string {
    const stringSplitted = name.trim().split(" ");
  
    const stringSplittedCapitalized = stringSplitted.map((string) => {
      const stringCapitalized =
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      return stringCapitalized;
    });
  
    const stringCapitalized = stringSplittedCapitalized.join(" ");
  
    return stringCapitalized;
  };

  private addCpfMask(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };
  
  private addRgMask(rg: string): string {
    return rg.replace(/^(\d{2})(\d{3})(\d{3})([Xx]|\d?)$/, "$1.$2.$3-$4");
  };
  
  private addPhoneMask(phone: string): string {
    return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
  };
  
  private addCepMask(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  };
};

export type UserResume = Pick<
  User,
  | "id"
  | "cpf"
  | "name"
  | "sex"
  | "rg"
  | "email"
  | "phone"
  | "birthDate"
  | "church"
  | "payment"
  | "checkinDate"
  | "checkoutDate"
  | "ticket"
>;