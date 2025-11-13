import { Buffer } from "buffer";

export default function codeNumberBase64(data:number): string {
    const code64:string = Buffer.from(data.toString()).toString('base64');
    return code64;
};