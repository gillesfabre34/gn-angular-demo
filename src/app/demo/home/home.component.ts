import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Method } from './models/method.model';
import { Book } from './models/book.model';
import { mapToObject } from 'genese-mapper';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    public method: Method = undefined;



    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private router: Router
    ) {
    }


    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------

    ngOnInit(): void {
        const book = {
            author: 'zzz'
        };
        console.log('%c ngOnInit book ', 'font-weight: bold; color: brown;', book);
        const mapped = mapToObject(book, Book);
        console.log('%c ngOnInit mapped ', 'font-weight: bold; color: brown;', mapped);
    }

    displayMethod(method: Method): void {
        this.router.navigate([method]);
    }

    // --------------------------------------------------
    //                 CALLS TO GENESE
    // --------------------------------------------------

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
    //         .subscribe((response: {results: Book[], totalResults: number}) => {
    //             console.log('%c getAllWithPagination response ', 'font-weight: bold; color: orange;', response);
    //             this.displayMatTableDataSource(response);
    //         });
    // }e() {
}
