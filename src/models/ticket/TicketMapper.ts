import { TicketTypes } from "./TicketInterface";

export const TicketMapper = new Map<Number, TicketTypes>([
    [0, TicketTypes.Acampante],
    [1, TicketTypes.Diaria],
]);