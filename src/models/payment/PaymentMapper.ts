import { PaymentTypes } from "./PaymentInterface";

export const PaymentMapper = new Map<string, PaymentTypes>([
    ["P", PaymentTypes["Em processamento"]],
    ["A", PaymentTypes.Aprovado],
    ["E", PaymentTypes.Equipe]
]);