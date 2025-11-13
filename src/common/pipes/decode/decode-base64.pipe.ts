import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class DecodeBase64Pipe implements PipeTransform {
    transform(value: any, _metadata: ArgumentMetadata) {
        if ( typeof value ===  'object' ) {
            for ( const key in value ) {
                if ( typeof value[key] === 'string' ) {
                    try {
                        const decode = Buffer.from(value[key],'base64').toString('utf-8');
                        value[key]=decode;
                    } catch {};
                };
            };
        };
        return value;
    };
};