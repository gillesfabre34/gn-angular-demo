import { GeneseModelEnvironment, ArrayResponse } from 'genese-angular';
import { Category } from '../enums/category';
import { Author } from '../../../../../backend/src/app/models/author.model';


export class ArrayOfArraysOfStrings implements ArrayResponse {

    public gnArrayResponse ?= [['']];
    public genese?: GeneseModelEnvironment = {
        path: '/arrayOfArraysOfStrings'
    };
}
