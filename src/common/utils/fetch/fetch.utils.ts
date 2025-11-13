import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

import type { TUri, THeaders, TMethod } from 'src/common/utils/fetch/request-fecth.type'
import type { IFecth } from 'src/common/utils/fetch/request-fecth.interface'

export default async function requestFecth<TResponse, TRequestBody = TResponse> ( 
    uri:TUri, 
    method:TMethod = 'GET', 
    body?:TRequestBody, 
    headers:THeaders = { 
        'Content-Type':'application/json' 
    },
    token?:string,
):Promise<IFecth<TResponse>> {

    if ( !uri ) throw new BadRequestException('URI no encontrada');
    if ( token ) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(uri, {
        method,
        headers,
        body: method === 'GET' ? undefined : JSON.stringify(body),
    });

    if ( !response.ok ) throw new InternalServerErrorException('Error en la red o la solicitud falló')
    const data = await response.json();

    return data;

    /*return {
        data,
        message:data.message,
    };*/
};