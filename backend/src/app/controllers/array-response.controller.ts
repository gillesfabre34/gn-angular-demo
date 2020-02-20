import { Controller, Get } from '@nestjs/common';

@Controller('array-response')
export class ArrayResponseController {
    constructor() { }

    @Get('/array-of-strings')
    async getArrayOfStrings() {
        console.log('getArrayOfStrings');
        return ['first string', 'second string', null, , 'last string'];
    }

    @Get('/array-of-arrays-of-strings')
    async getArrayOfArraysOfStrings() {
        console.log('getArrayOfArraysOfStrings');
        return [['first string', 'second string'], null, [null], ['last string']];
    }
}
