import { PaymentTypes } from "./PaymentInterface";

export const PaymentMapper = new Map<string, PaymentTypes>([
    ["P", PaymentTypes["Em processamento"]],
    ["A", PaymentTypes.Aprovado],
    ["D", PaymentTypes.Diretor],
    ["F", PaymentTypes.Doacao],
    ["E", PaymentTypes.Equipe],
    ["L", PaymentTypes.Lider],
]);