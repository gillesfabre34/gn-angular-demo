import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Books, LightBookEditor } from './models/books.model';
import { ResponseStatus } from '../enums/response-status';
import { Method } from './models/method.model';
import { MethodService } from './services/method.service';
import { Genese, GeneseService, GetAllResponse, RequestMethod } from 'genese-angular';
import { BOOK } from './mocks/book.mock';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

    // --------------------------------------------------
    //                     PROPERTIES
    // --------------------------------------------------

    public booleansGenese: Genese<Boolean>;
    public booksGenese: Genese<Books>;
    public categoriesGenese: Genese<String>;
    public codesGenese: Genese<Number>;
    public dataSource = new MatTableDataSource<Books>();
    public displayedColumns: string[] = [];
    public emptyList = true;
    public method: Method = {};
    public pageIndex = 0;
    public pageSize = 5;
    public rootPath = '/books';

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------

    constructor(
        private dialog: MatDialog,
        private geneseService: GeneseService,
        public methodService: MethodService,
    ) {
        this.booleansGenese = geneseService.getGeneseInstance(Boolean);
        this.booksGenese = geneseService.getGeneseInstance(Books);
        this.categoriesGenese = geneseService.getGeneseInstance(String);
        this.codesGenese = geneseService.getGeneseInstance(Number);
    }


    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------

    /**
     * Component initialization
     */
    ngOnInit(): void {
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


    /**
     * Get one book for a given id
     * @param id
     */
    getOne(id: string): void {
        // this.method = this.methodService.getMethod('getOne');
        this.booksGenese.getOne(this.rootPath, '1').subscribe((book: Books) => {
            console.log('%c GeneseAbstract getOne book ', 'font-weight: bold; color: green;', book);
        });
    }


    /**
     * Get one book for a given id
     * @param id
     */
    getOneCustom(): void {
        // this.method = this.methodService.getMethod('getOne');
        this.booksGenese.request('/books/get-one-custom', RequestMethod.POST, {
            body: {id: 2}
        }).subscribe((book: Books) => {
            // this.booksGenese.getOneCustom({path: '/books/2'}).subscribe((book: Books) => {
            console.log('%c GeneseAbstract getOneCustom book ', 'font-weight: bold; color: teal;', book);
        });
    }

    /**
     * Get one book with all gnTranslate fields translated in a given language
     * @param id
     * @param language
     */
    getOneTranslated(id: string, language: string): void {
        this.method = this.methodService.getMethod('getOneTranslated');
        this.booksGenese.getOne(this.rootPath, id).subscribe(book => {
            const objectTranslated = this.booksGenese.translate(book, language);
            console.log('%c getOneTranslated objectTranslated ', 'font-weight: bold; color: black;', objectTranslated);
        });
    }


    /**
     * Get all the books with pagination
     */
    getAll(): void {
        this.method = this.methodService.getMethod('getAll');
        this.displayedColumns = ['id', 'author', 'title', 'description', 'actions'];
        this.booksGenese
            .getAll('/books')
            .subscribe((response: Books[]) => {
                console.log('%c getAll response ', 'font-weight: bold; color: black;', response);
                if (Array.isArray(response)) {
                    this.displayMatTableDataSource({results: response, totalResults: response.length});
                }
            });
    }


    /**
     * Get all with primitive arrays
     */
    getAllPrimitives(id: string): void {
        this.method = this.methodService.getMethod('getAllPrimitives');
        this.categoriesGenese
            .getAll(`/books/${id}/categories`)
            .subscribe((data: string[]) => {
                console.log('%c getAllPrimitives categories ', 'font-weight: bold; color: brown;', data);
            });
        this.codesGenese
            .getAll(`/books/${id}/codes`)
            .subscribe((data: number[]) => {
                console.log('%c getAllPrimitives codes ', 'font-weight: bold; color: brown;', data);
            });
        this.booleansGenese
            .getAll(`/books/${id}/booleans`)
            .pipe()
            .subscribe((data: boolean[]) => {
                console.log('%c getAllPrimitives codes ', 'font-weight: bold; color: brown;', data);
            });
    }

    /**
     * Get all the books with pagination
     */
    getAllWithPagination(): void {
        this.method = this.methodService.getMethod('getAllWithPagination');
        this.displayedColumns = ['id', 'author', 'title', 'description', 'actions'];
        this.booksGenese
            .getAllWithPagination(
                this.rootPath,
                {
                    pageIndex: this.paginator.pageIndex,
                    pageSize: this.paginator.pageSize
                })
            .subscribe((response: {results: Books[], totalResults: number}) => {
                console.log('%c getAllWithPagination response ', 'font-weight: bold; color: orange;', response);
                this.displayMatTableDataSource(response);
            });
    }


    delete(id: string): void {
        this.booksGenese.delete(this.rootPath, id).subscribe((response: ResponseStatus) => {
            console.log('%c GeneseAbstract delete response ', 'font-weight: bold; color: brown;', response);
            this.getAll();
        });
    }


    create() {
        this.method = this.methodService.getMethod('create');
        this.booksGenese.create(this.rootPath, BOOK).subscribe((newBook: Books) => {
            console.log('%c GeneseAbstract create newBook ', 'font-weight: bold; color: fuchsia;', newBook);
            this.getAll();
        });
    }



    update() {
        this.method = this.methodService.getMethod('update');
    }


    /**
     * Display the books list in a MatTable with pagination
     * @param data
     */
    displayMatTableDataSource(data: GetAllResponse<Books>) {
        this.dataSource = data && Array.isArray(data.results) ? new MatTableDataSource(data.results) : new MatTableDataSource([]);
        this.paginator.length = data && data.totalResults ? data.totalResults : 0;
        this.emptyList = this.paginator.length === 0;
    }
}
