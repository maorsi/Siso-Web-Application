import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { NewUserComponent } from './newuser.component';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'login', component: LoginComponent },
            { path: 'new-user', component: NewUserComponent },
            { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] }
        ])
    ],
    declarations: [
        EditUserComponent,
        NewUserComponent,
        LoginComponent
    ],
    providers: [
        AuthService,
        AuthGuard
    ]
})
export class UserModule { }
