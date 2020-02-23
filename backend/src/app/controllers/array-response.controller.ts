import { Controller, Get } from '@nestjs/common';
import { BOOKS } from '../mocks/book.mock';

@Controller('array-response')
export class ArrayResponseController {
    constructor() { }

    @Get('/array-of-strings')
    async getArrayOfStrings() {
        return ['first string', 'second string', null, , 'last string'];
    }

    @Get('/array-of-arrays-of-books')
    async getArrayOfArraysOfBooks() {
        return [[BOOKS[0], BOOKS[1], BOOKS[0]], null, [BOOKS[0]]];
    }

    @Get('/array-of-arrays-of-strings')
    async getArrayOfArraysOfStrings() {
        return [['first string', 'second string'], null, [null], ['last string']];
    }
}
