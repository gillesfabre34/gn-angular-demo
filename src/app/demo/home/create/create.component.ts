import { Component, OnInit } from '@angular/core';
import { BOOK } from '../mocks/book.mock';
import { Book } from '../models/book.model';
import { Genese, GeneseService } from 'gn-angular';


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

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
        this.create();
    }


    create() {
        this.booksGenese.create(BOOK).subscribe((newBook: Book) => {
            console.log('%c GeneseAbstract create newBook ', 'font-weight: bold; color: fuchsia;', newBook);
        });
    }


}
