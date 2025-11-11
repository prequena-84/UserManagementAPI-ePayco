export interface ITransaction {
    id?: string;
    userDocument: number;
    type: 'recarga' | 'pago';
    amount: number;
    status: 'pendiente' | 'confirmada';
    tokenConfirmation?: string | null;
    sessionExp?: number | null;
}