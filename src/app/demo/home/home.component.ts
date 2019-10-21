import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Books, LightBookEditor } from './models/books.model';
import { ResponseStatus } from '../enums/response-status';
import { Method } from './models/method.model';
import { MethodService } from './services/method.service';
import { Genese, GeneseService, GetAllResponse, Language, RequestMethod } from 'genese-angular';
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
        this.booksGenese.getOne('1').subscribe((book: Books) => {
            console.log('%c GeneseAbstract getOne book ', 'font-weight: bold; color: green;', book);
        });
    }


    /**
     * Get one book for a given id
     * @param id
     */
    getOneCustom(): void {
        // this.method = this.methodService.getMethod('getOne');
        this.booksGenese.request(RequestMethod.POST, '/books/get-one-custom', {
            body: {id: 2}
        }).subscribe((book: Books) => {
            // this.booksGenese.getOneCustom({path: '/books/2'}).subscribe((book: Books) => {
            console.log('%c GeneseAbstract getOneCustom book ', 'font-weight: bold; color: teal;', book);
        });
    }


    /**
     * Get one book with only fields corresponding to LightBookEditor model
     * This methodName uses the Genese special query with gExtract param
     * The api route is /books/{id}?gExtract=...
     * @param id
     */
    getOneExtract(id: string): void {
        this.method = this.methodService.getMethod('getOneExtract');
        this.booksGenese.getOneExtract<LightBookEditor>(id, LightBookEditor).subscribe((editor: LightBookEditor) => {
            console.log('%c GeneseAbstract getOneExtract editor ', 'font-weight: bold; color: fuchsia;', editor);
        });
    }


    /**
     * Get one book with all gnTranslate fields translated in a given language
     * @param id
     * @param language
     */
    getOneTranslated(id: string, language: string): void {
        this.method = this.methodService.getMethod('getOneTranslated');
        this.booksGenese.getOne(id).subscribe(book => {
            const objectTranslated = this.booksGenese.translate(book, language as Language);
            console.log('%c GeneseAbstract getOneTranslated objectTranslated ', 'font-weight: bold; color: black;', objectTranslated);
        });
    }


    /**
     * Get all the books with pagination
     */
    getAll(): void {
        this.method = this.methodService.getMethod('getAll');
        this.displayedColumns = ['id', 'author', 'title', 'description', 'actions'];
        this.booksGenese
            .getAll()
            .pipe()
            .subscribe((data: GetAllResponse<Books>) => this.displayMatTableDataSource(data));
    }


    /**
     * Get all the books with pagination
     */
    getAllPrimitives(id: string): void {
        this.method = this.methodService.getMethod('getAllPrimitives');
        this.categoriesGenese
            .getAll({
                path: `/books/${id}/categories`
            })
            .pipe()
            .subscribe((data: GetAllResponse<String>) => {
                console.log('%c getAllPrimitives categories ', 'font-weight: bold; color: brown;', data);
            });
        this.codesGenese
            .getAll({
                path: `/books/${id}/codes`
            })
            .pipe()
            .subscribe((data: GetAllResponse<Number>) => {
                console.log('%c getAllPrimitives codes ', 'font-weight: bold; color: brown;', data);
            });
        this.booleansGenese
            .getAll({
                path: `/books/${id}/booleans`
            })
            .pipe()
            .subscribe((data: GetAllResponse<Boolean>) => {
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
            .getAll(
                {
                    page: this.paginator.pageIndex,
                    limit: this.paginator.pageSize
                })
            .pipe()
            .subscribe((data: GetAllResponse<Books>) => this.displayMatTableDataSource(data));
    }


    delete(id: string): void {
        this.method = this.methodService.getMethod('delete');
        this.booksGenese.delete(id).subscribe((response: ResponseStatus) => {
            console.log('%c GeneseAbstract delete response ', 'font-weight: bold; color: brown;', response);
            this.getAll();
        });
    }


    create() {
        this.method = this.methodService.getMethod('create');
        this.booksGenese.create(BOOK).subscribe((newBook: Books) => {
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
    displayMatTableDataSource(data) {
        console.log('%c GeneseAbstract getAllWithPagination data ', 'font-weight: bold; color: green;', data);
        this.dataSource = data && Array.isArray(data.results) ? new MatTableDataSource(data.results) : new MatTableDataSource([]);
        this.paginator.length = data && data.totalResults ? data.totalResults : 0;
        this.emptyList = this.paginator.length === 0;
    }
}
