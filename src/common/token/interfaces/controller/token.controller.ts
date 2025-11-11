import { Controller, Body, Post, Param  } from '@nestjs/common';
import { TokenService } from '../../infrastructure/repositories/token.repository';
import { TokenDTO } from '../dto/token.dto';

@Controller('UserManagementAPI/V1/token/validate')
export class TokenController {
    constructor( private readonly tokenServices:TokenService ) {}

    @Post(':id')
    async validate(@Param('id') id:string, @Body() dto:TokenDTO): Promise<boolean> {
        return this.tokenServices.validateToken(dto.token, id);
    };
};