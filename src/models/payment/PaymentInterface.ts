export interface PaymentInterface {
    payment: string;
}

export enum PaymentTypes {
    "Em processamento" = "Em processamento",
    "Aprovado" = "Aprovado",
    "Equipe" = "Equipe"
}