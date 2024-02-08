export interface PaymentInterface {
    payment: string;
}

export enum PaymentTypes {
    "Em processamento" = "Em processamento",
    "Aprovado" = "Aprovado",
    "Diretor" = "Diretor",
    "Equipe" = "Equipe",
    "Doacao" = "Doacao",
    "Lider" = "Lider",
}