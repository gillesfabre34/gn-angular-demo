import { Component, OnInit } from '@angular/core';
import { Genese, GeneseService } from 'genese-angular';
import { Book } from '../models/book.model';
import { ArrayOfArraysOfStrings } from '../models/arrayOfArraysOfStrings.model';


@Component({
    selector: 'app-get-one',
    templateUrl: './get-one.component.html',
    styleUrls: ['./get-one.component.scss']
})
export class GetOneComponent implements OnInit {

    public booksGenese: Genese<Book>;
    public arrayOfArraysOfStringsGenese: Genese<ArrayOfArraysOfStrings>;
    public model = {
        genese: {
            path: '/books'
        }
    };

    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private geneseService: GeneseService,
    ) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
        this.arrayOfArraysOfStringsGenese = geneseService.getGeneseInstance(ArrayOfArraysOfStrings);
    }

    ngOnInit(): void {
        this.getOne('1');
    }

    /**
     * Get one book for a given id
     * @param id
     */
    getOne(id: string): void {
        this.booksGenese.getOne(id).subscribe((book: Book) => {
            console.log('%c Get one book ', 'font-weight: bold; color: green;', book);
        });
    }
}
