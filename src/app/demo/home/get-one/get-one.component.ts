import { Component, OnInit } from '@angular/core';
import { Genese, GeneseService } from 'gn-angular';
import { Book } from '../models/book.model';


@Component({
    selector: 'app-get-one',
    templateUrl: './get-one.component.html',
    styleUrls: ['./get-one.component.scss']
})
export class GetOneComponent implements OnInit {

    public booksGenese: Genese<Book>;
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
            console.log('%c GeneseAbstract getOne book ', 'font-weight: bold; color: green;', book);
        });
    }
}
