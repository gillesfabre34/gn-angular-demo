import { GeneseModelEnvironment, ArrayResponse } from 'genese-angular';
import { Category } from '../enums/category';
import { Author } from '../../../../../backend/src/app/models/author.model';


export class ArrayOfStrings implements ArrayResponse {

    public gnArrayResponse ?= [''];
    public genese?: GeneseModelEnvironment = {
        path: '/array-response/array-of-arrays-of-strings'
    };
}
