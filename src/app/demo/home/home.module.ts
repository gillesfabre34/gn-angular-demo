import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../core/core.module';
import { GetOneComponent } from './get-one/get-one.component';
import { GetAllComponent } from './get-all/get-all.component';
import { DataListComponent } from './data-list/data-list.component';
import { GetOneCustomComponent } from './get-one-custom/get-one-custom.component';
import { GetAllCustomComponent } from './get-all-custom/get-all-custom.component';
import { CreateComponent } from './create/create.component';


@NgModule({
    declarations: [
        CreateComponent,
        DataListComponent,
        GetAllComponent,
        GetAllCustomComponent,
        GetOneComponent,
        GetOneCustomComponent,
        HomeComponent
    ],
    imports: [
        CoreModule,

        AppRoutingModule
    ],
    entryComponents: [
        HomeComponent,
    ],
    providers: [
    ],
    exports: [],
})
export class HomeModule { }
