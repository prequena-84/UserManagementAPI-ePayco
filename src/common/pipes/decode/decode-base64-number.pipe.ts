import { Buffer } from "buffer";

export default function decodeNumberBase64(data:string | undefined): number {
    const decode:number = parseFloat(Buffer.from(data as string, 'base64').toString());
    return decode;
};