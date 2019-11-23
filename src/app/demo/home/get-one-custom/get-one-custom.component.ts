import { Component, OnInit } from '@angular/core';
import { Genese, GeneseService } from 'genese-angular';
import { Book } from '../models/book.model';
import { homeEnv } from '../homeEnv';


@Component({
    selector: 'app-get-one-custom',
    templateUrl: './get-one-custom.component.html',
    styleUrls: ['./get-one-custom.component.scss']
})
export class GetOneCustomComponent implements OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    public booksGenese: Genese<Book>;

    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private geneseService: GeneseService,
    ) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    ngOnInit(): void {
        this.getOneCustom('1');
    }

    /**
     * Get one book for a given id
     * @param id
     */
    getOneCustom(id: string): void {
        this.booksGenese.getOneCustom(homeEnv.path, 'rez').subscribe((book: Book) => {
            console.log('%c GeneseAbstract getOne book ', 'font-weight: bold; color: green;', book);
        });
    }
}
