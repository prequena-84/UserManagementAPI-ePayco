export interface ITransaction {
    id?: string;
    document: string;
    type: 'recarga' | 'pago' | string;
    amount: string;
    status: 'pendiente' | 'confirmada' | string;
    tokenConfirmation?: string;
    sessionExp?: string;
}