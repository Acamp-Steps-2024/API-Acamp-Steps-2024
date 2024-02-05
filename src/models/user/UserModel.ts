const lodash = require('lodash');

import { SexInterface, SexTypes } from "@models/sex/SexInterface";
import { ChurchInterface, ChurchTypes } from "@models/church/ChurchInterface";
import {
  PaymentInterface,
  PaymentTypes,
} from "@models/payment/PaymentInterface";
import { TicketInterface, TicketTypes } from "@models/ticket/TicketInterface";
import { UserInterface } from "./UserInterface";
import { removeSpecialCharacters } from "@utils/index";

import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsNumber,
  IsEnum,
  Length,
  IsOptional,
  validate,
  Matches,
} from "class-validator";
import { IsValidCpf } from "@validators/cpfValidator.decorator";
import { ChurchMapper } from "@models/church/ChurchMapper";

export class User implements UserInterface {
  @IsString()
  @Length(5, 5)
  @IsOptional()
  id: string

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
  @IsValidCpf()
  cpf: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  surname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(SexTypes)
  sex: SexInterface;

  @IsDefined()
  @IsNotEmpty()
  @Matches(/^(?:\d{2}\.?\d{3}\.?\d{3}[-/]?|\d{8}[-/]?)\d{1}\b|^(?:\d{2}\.?\d{3}\.?\d{3}[-/]?|\d{8}[-/]?)X\b/)
  rg: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?\d{2} ?\(?(\d{2})?\)? ?(\d{5})?[- ]?(\d{4})?$/)
  phone: string;

  @IsString()
  @Length(2, 60)
  @IsOptional()
  companionName: string | null;

  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @IsString()
  @Length(2, 60)
  @IsOptional()
  responsiblePersonName: string | null;

  @IsString()
  @IsOptional()
  @Matches(/^(?:\d{2}\.?\d{3}\.?\d{3}[-/]?|\d{8}[-/]?)\d{1}\b|^(?:\d{2}\.?\d{3}\.?\d{3}[-/]?|\d{8}[-/]?)X\b/)
  responsiblePersonDocument: string | null;

  @IsString()
  @IsOptional()
  @Matches(/^\+?\d{2} ?\(?(\d{2})?\)? ?(\d{5})?[- ]?(\d{4})?$/)
  responsiblePersonPhone: string | null;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\d{5}-\d{3}|\d{8})$/)
  cep: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  street: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  houseNumber: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  neighborhood: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  city: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  state: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(ChurchTypes)
  church: ChurchInterface;

  @IsString()
  @Length(0, 500)
  allergies: string;

  @IsString()
  @Length(0, 500)
  medicines: string;

  @IsEnum(PaymentTypes)
  @IsOptional()
  payment: PaymentInterface | null;

  @IsDate()
  @IsOptional()
  paymentDate: Date | null;

  @IsString()
  @IsOptional()
  paymentCode: string | null;

  @IsDate()
  @IsOptional()
  checkinDate: Date | null;

  @IsDate()
  @IsOptional()
  checkoutDate: Date | null;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(TicketTypes)
  ticket: TicketInterface;

  @IsString()
  @IsOptional()
  daily?: string | null;

  constructor(userData: UserInterface) {
    this.id = userData.id ? String(userData.id) : generateRandomID(userData.church);
    this.cpf = this.addCpfMask(userData.cpf);
    this.name = this.setNameWithUppercase(userData.name);
    this.surname = this.setNameWithUppercase(userData.surname);
    this.sex = userData.sex;
    this.rg = this.addRgMask(userData.rg);
    this.email = String(userData.email).toLowerCase();
    this.phone = this.addPhoneMask(userData.phone);
    this.companionName =  userData.companionName ? this.setNameWithUppercase(userData.companionName) : null;
    this.birthDate = new Date(userData.birthDate);
    this.responsiblePersonName = userData.responsiblePersonName ? this.setNameWithUppercase( userData.responsiblePersonName) : null;
    this.responsiblePersonDocument = userData.responsiblePersonDocument ? this.addRgMask(userData.responsiblePersonDocument) : null;
    this.responsiblePersonPhone = userData.responsiblePersonPhone ? this.addPhoneMask(userData.responsiblePersonPhone) : null;
    this.cep = this.addCepMask(userData.cep);
    this.street = String(userData.street);
    this.houseNumber = Number(userData.houseNumber);
    this.neighborhood = String(userData.neighborhood);
    this.city = String(userData.city);
    this.state = String(userData.state);
    this.church = userData.church;
    this.allergies = String(userData.allergies);
    this.medicines = String(userData.medicines);
    this.payment = userData.payment ? userData.payment : null;
    this.paymentDate = userData.paymentDate ? new Date(userData.paymentDate) : null;
    this.paymentCode = userData.paymentCode ? String(userData.paymentCode) : null;
    this.checkinDate = userData.checkinDate ? new Date(userData.checkinDate) : null;
    this.checkoutDate = userData.checkoutDate ? new Date(userData.checkoutDate) : null;
    this.ticket = userData.ticket;
    this.daily = userData.daily ? String(userData.daily) : null;
  }

  private setNameWithUppercase(name: string): string {
    const stringSplitted = name.trim().split(" ");

    const stringSplittedCapitalized = stringSplitted.map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    });

    return stringSplittedCapitalized.join(" ");
  }

  private addCpfMask(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  private addRgMask(rg: string): string {
    return rg.replace(/^(\d{2})(\d{3})(\d{3})([Xx]|\d?)$/, "$1.$2.$3-$4");
  }

  private addPhoneMask(phone: string): string {
    return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
  }

  private addCepMask(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  }
}

export function getUserInput(userData: object): UserInterface {
  return lodash.omit(userData, ['id', 'payment', 'paymentDate', 'paymentCode', 'checkinDate', 'checkoutDate', 'daily']) as unknown as UserInterface;
}

export function generateRandomID(church: ChurchInterface): string {
  const hexCode = String(Math.floor(Math.random() * 256).toString(16).padStart(3, "0")).toUpperCase();
  let churchCode;

  for (let entry of ChurchMapper.entries()) {
    if ((church as unknown as ChurchTypes)=== entry[1]) {
      churchCode = String(entry[0]);
    }
  }

  const group = Math.floor(Math.random() * 4) + 1;
  return String(`${hexCode}${churchCode}${group}`);
}

export async function validateUserInput(user: UserInterface): Promise<any[]> {
  if (Object.keys(user).length === 0 || 
      !user ||
      !user.cpf ||
      !user.name ||
      !user.surname ||
      !user.sex ||
      !user.rg ||
      !user.email ||
      !user.phone ||
      !user.birthDate ||
      !user.cep ||
      !user.street ||
      !user.houseNumber ||
      !user.neighborhood ||
      !user.city ||
      !user.state ||
      !user.church ||
      !user.ticket
  ) return ["One or more required fields are missing."];

  const errors = await validate(new User(user));
  return errors.map((error) => lodash.omit(error, ['target', 'children']));
}

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
