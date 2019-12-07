import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { Genese, GeneseService } from 'genese-angular';
import { homeEnv } from '../homeEnv';


@Component({
    selector: 'app-get-all-custom',
    templateUrl: './get-all-custom.component.html',
    styleUrls: ['./get-all-custom.component.scss']
})
export class GetAllCustomComponent implements OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    public booksGenese: Genese<Book>;
    public data: any[] = [];
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
        this.getData();
    }


    getData(): void {
        this.booksGenese
            .getAllCustom(`${homeEnv.path}/custom-path`)
            .subscribe((response: Book[]) => {
                console.log('%c getAllCustom response ', 'font-weight: bold; color: black;', response);
                this.data = response;
            });
    }
}
