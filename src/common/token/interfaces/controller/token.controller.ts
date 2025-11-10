import { Controller, Body, Post, Param  } from '@nestjs/common';
import { TokenService } from '../../infrastructure/repositories/token.repository';
import { DecodeBase64Params } from 'src/common/pipes/decode-base64.params.pipe';
import { DecodeBase64Pipe } from 'src/common/pipes/decode-base64.pipe';
import { TokenDTO } from '../dto/token.dto';

@Controller('UserManagementAPI/V1/token/validate')
export class TokenController {
    constructor( private readonly tokenServices:TokenService ) {}

    @Post(':id')
    async validate( 
        @Param('id', DecodeBase64Params) id:string, 
        @Body(new DecodeBase64Pipe()) dto:TokenDTO 
    ): Promise<boolean> {
        return this.tokenServices.validateToken(dto.token, id);
    };
};