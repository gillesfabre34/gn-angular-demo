import { Component, OnInit } from '@angular/core';
import { Books } from './models/books.model';
import { Genese, GeneseService } from 'genese-angular';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    public booleansGenese: Genese<Boolean>;
    public booksGenese: Genese<Books>;
    public categoriesGenese: Genese<String>;
    public codesGenese: Genese<Number>;
    public method: Method = undefined;
    public rootPath = '/books';



    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private geneseService: GeneseService,
    ) {
        this.booleansGenese = geneseService.getGeneseInstance(Boolean);
        this.categoriesGenese = geneseService.getGeneseInstance(String);
        this.codesGenese = geneseService.getGeneseInstance(Number);
    }


    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------

    ngOnInit(): void {
    }

    displayMethod(method: Method): void {
        this.method = method;
    }

    // --------------------------------------------------
    //                 CALLS TO GENESE
    // --------------------------------------------------


    // create() {
    //     this.booksGenese.create(this.rootPath, BOOK).subscribe((newBook: Books) => {
    //         console.log('%c GeneseAbstract create newBook ', 'font-weight: bold; color: fuchsia;', newBook);
    //         this.getAll();
    //     });
    // }
    //
    //
    // delete(id: string): void {
    //     this.booksGenese.delete(this.rootPath, id).subscribe((response: ResponseStatus) => {
    //         console.log('%c GeneseAbstract delete response ', 'font-weight: bold; color: brown;', response);
    //         this.getAll();
    //     });
    // }

    /**
     * Get all with primitive arrays
     */
    // getAllPrimitives(id: string): void {
    //     this.categoriesGenese
    //         .getAll(`/books/${id}/categories`)
    //         .subscribe((data: string[]) => {
    //             console.log('%c getAllPrimitives categories ', 'font-weight: bold; color: brown;', data);
    //         });
    //     this.codesGenese
    //         .getAll(`/books/${id}/codes`)
    //         .subscribe((data: number[]) => {
    //             console.log('%c getAllPrimitives codes ', 'font-weight: bold; color: brown;', data);
    //         });
    //     this.booleansGenese
    //         .getAll(`/books/${id}/booleans`)
    //         .pipe()
    //         .subscribe((data: boolean[]) => {
    //             console.log('%c getAllPrimitives codes ', 'font-weight: bold; color: brown;', data);
    //         });
    // }

    /**
     * Get all the books with pagination
     */
    // getAllWithPagination(): void {
    //     this.displayedColumns = ['id', 'author', 'title', 'description', 'actions'];
    //     this.booksGenese
    //         .getAllWithPagination(
    //             this.rootPath,
    //             {
    //                 pageIndex: this.paginator.pageIndex,
    //                 pageSize: this.paginator.pageSize
    //             })
    //         .subscribe((response: {results: Books[], totalResults: number}) => {
    //             console.log('%c getAllWithPagination response ', 'font-weight: bold; color: orange;', response);
    //             this.displayMatTableDataSource(response);
    //         });
    // }



    update() {
    }


}

export type Method = 'getOne' | 'getAll' | 'getAllWithPagination';
