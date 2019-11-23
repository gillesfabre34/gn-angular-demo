import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Genese, GeneseService, GetAllResponse } from 'genese-angular';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Book } from '../models/book.model';
import { tap } from 'rxjs/operators';
import { homeEnv } from '../homeEnv';
import { ResponseStatus } from '../../enums/response-status';
import { BOOK } from '../mocks/book.mock';


@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements AfterViewInit, OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    public booksGenese: Genese<Book>;
    public dataSource = new MatTableDataSource<Book>();
    public displayedColumns: string[] = [];
    public emptyList = true;
    public pageIndex = 0;
    public pageSize = 5;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private geneseService: GeneseService,
    ) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    /**
     * Component initialization
     */
    ngOnInit(): void {
        // console.log('%c ngOnInit this.paginator ', 'font-weight: bold; color: fuchsia;', this.paginator);
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.pageSize = this.pageSize;
        this.getAll();
    }

    /**
     * Component after initialization
     */
    ngAfterViewInit(): void {
        this.paginator.page
            .pipe(
                tap(() => this.getAllWithPagination())
            )
            .subscribe();
    }




    create() {
        this.booksGenese.create(homeEnv.path, BOOK).subscribe((newBook: Book) => {
            console.log('%c GeneseAbstract create newBook ', 'font-weight: bold; color: fuchsia;', newBook);
            this.getAll();
        });
    }


    delete(id: string): void {
        this.booksGenese.delete(homeEnv.path, id).subscribe((response: ResponseStatus) => {
            console.log('%c GeneseAbstract delete response ', 'font-weight: bold; color: brown;', response);
            this.getAll();
        });
    }



    /**
     * Get all the books with pagination
     */
    getAll(): void {
        this.displayedColumns = ['id', 'author', 'title', 'description', 'actions'];
        // console.log('%c getAll this.booksGenese ', 'font-weight: bold; color: black;', this.booksGenese);
        // console.log('%c getAll homeEnv.path ', 'font-weight: bold; color: black;', homeEnv.path);
        this.booksGenese
            .getAll(homeEnv.path)
            .subscribe((response: Book[]) => {
                console.log('%c getAll response ', 'font-weight: bold; color: black;', response);
                if (Array.isArray(response)) {
                    this.displayMatTableDataSource({results: response, totalResults: response.length});
                }
            });
    }

    /**
     * Get all the books with pagination
     */
    getAllWithPagination(): void {
        this.displayedColumns = ['id', 'author', 'title', 'description', 'actions'];
        this.booksGenese
            .getAllWithPagination(
                homeEnv.path,
                {
                    pageIndex: this.paginator.pageIndex,
                    pageSize: this.paginator.pageSize
                })
            .subscribe((response: {results: Book[], totalResults: number}) => {
                console.log('%c getAllWithPagination response ', 'font-weight: bold; color: orange;', response);
                this.displayMatTableDataSource(response);
            });
    }

    /**
     * Get one book for a given id
     * @param id
     */
    getOne(id: string): void {
        this.booksGenese.getOne(homeEnv.path, '1').subscribe((book: Book) => {
            console.log('%c GeneseAbstract getOne book ', 'font-weight: bold; color: green;', book);
        });
    }



    /**
     * Display the books list in a MatTable with pagination
     * @param data
     */
    displayMatTableDataSource(data: GetAllResponse<Book>) {
        this.dataSource = data && Array.isArray(data.results) ? new MatTableDataSource(data.results) : new MatTableDataSource([]);
        this.paginator.length = data && data.totalResults ? data.totalResults : 0;
        this.emptyList = this.paginator.length === 0;
    }


}
