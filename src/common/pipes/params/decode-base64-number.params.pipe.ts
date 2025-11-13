import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata, HttpException } from "@nestjs/common";
import { Buffer } from "buffer";

@Injectable()
export class DecodeBase64NumberParams implements PipeTransform {
    transform(value: string, _metadata: ArgumentMetadata) {
        try {
            const decode = Buffer.from(value,'base64').toString('utf-8');
            const numberId = parseInt(decode, 10);

            if ( isNaN(numberId) ) throw new BadRequestException('Numero de ID errado');
            return numberId;

        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            throw new BadRequestException('ID no decodable en Base6');
        };
    };
};