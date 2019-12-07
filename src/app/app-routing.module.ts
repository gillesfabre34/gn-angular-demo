import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './demo/home/home.component';
import { AuthGuardService } from './demo/core/services/auth-guard.service';
import { GetOneComponent } from './demo/home/get-one/get-one.component';
import { GetOneCustomComponent } from './demo/home/get-one-custom/get-one-custom.component';
import { GetAllComponent } from './demo/home/get-all/get-all.component';
import { GetAllCustomComponent } from './demo/home/get-all-custom/get-all-custom.component';
import { CreateComponent } from './demo/home/create/create.component';
import { CreateCustomComponent } from './demo/home/create-custom/create-custom.component';
import { DeleteComponent } from './demo/home/delete/delete.component';
import { DeleteCustomComponent } from './demo/home/delete-custom/delete-custom.component';
import { UpdateComponent } from './demo/home/update/update.component';
import { UpdateCustomComponent } from './demo/home/update-custom/update-custom.component';
import { WelcomeComponent } from './demo/home/welcome/welcome.component';


const routes: Routes = [
    { path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        children: [
            {path: '', component: WelcomeComponent, canActivate: [AuthGuardService]},
            {path: 'create', component: CreateComponent, canActivate: [AuthGuardService]},
            {path: 'create-custom', component: CreateCustomComponent, canActivate: [AuthGuardService]},
            {path: 'delete', component: DeleteComponent, canActivate: [AuthGuardService]},
            {path: 'delete-custom', component: DeleteCustomComponent, canActivate: [AuthGuardService]},
            {path: 'get-all', component: GetAllComponent, canActivate: [AuthGuardService]},
            {path: 'get-all-custom', component: GetAllCustomComponent, canActivate: [AuthGuardService]},
            {path: 'get-one', component: GetOneComponent, canActivate: [AuthGuardService]},
            {path: 'get-one-custom', component: GetOneCustomComponent, canActivate: [AuthGuardService]},
            {path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]},
            {path: 'update-custom', component: UpdateCustomComponent, canActivate: [AuthGuardService]},
        ]
    },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: '**', component: HomeComponent, data: { error: 'Not found' }}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
