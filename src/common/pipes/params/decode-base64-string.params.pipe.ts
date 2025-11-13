import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata, HttpException } from "@nestjs/common";
import { Buffer } from "buffer";

@Injectable()
export class DecodeBase64StringParams implements PipeTransform {
    transform(value: string, _metadata: ArgumentMetadata) {
        try {
            return Buffer.from(value,'base64').toString('utf-8');
        } catch(err) {
            if ( err instanceof HttpException ) throw err;
            throw new BadRequestException('ID no decodable en Base6');
        };
    };
};