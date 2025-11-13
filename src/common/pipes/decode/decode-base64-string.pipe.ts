import { Buffer } from "buffer";

export default function decodeStringBase64(data:string): string {
    const decode:string = Buffer.from(data, 'base64').toString();
    return decode;
}