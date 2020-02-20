import { Component, OnInit } from '@angular/core';
import { Genese, GeneseService } from 'genese-angular';
import { ArrayOfArraysOfStrings } from '../models/arrayOfArraysOfStrings.model';
import { ArrayOfStrings } from '../models/arrayOfStrings.model';


@Component({
    selector: 'app-get-array',
    templateUrl: './get-array.component.html',
    styleUrls: ['./get-array.component.scss']
})
export class GetArrayComponent implements OnInit {

    public arrayOfArraysOfStringsGenese: Genese<ArrayOfArraysOfStrings>;
    public arrayOfStringsGenese: Genese<ArrayOfStrings>;
    public model = {
        genese: {
            path: '/app'
        }
    };

    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private geneseService: GeneseService,
    ) {
        this.arrayOfArraysOfStringsGenese = geneseService.getGeneseInstance(ArrayOfArraysOfStrings);
        this.arrayOfStringsGenese = geneseService.getGeneseInstance(ArrayOfStrings);
    }

    ngOnInit(): void {
        this.getArrayOfStrings();
        this.getArrayOfArraysOFStrings();
    }



    /**
     * Get array of strings
     */
    getArrayOfStrings(): void {
        this.arrayOfArraysOfStringsGenese.getArray().subscribe((data: any) => {
            console.log('%c getArrayOfStrings data', 'font-weight: bold; color: blue;', data);
        });
    }



    /**
     * Get array of arrays of strings
     */
    getArrayOfArraysOFStrings(): void {
        this.arrayOfArraysOfStringsGenese.getArray().subscribe((data: any) => {
            console.log('%c getArrayOfArraysOFStrings data', 'font-weight: bold; color: blue;', data);
        });
    }
}
