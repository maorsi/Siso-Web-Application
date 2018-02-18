import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
//import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
//import { CounterComponent } from './components/counter/counter.component';




import { UserModule } from './components/user/user.module';
import { TaskModule } from './components/task/task.module';
import { SnakeModule } from './components/snake/snake.module';




@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,


        HomeComponent
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        UserModule,
        TaskModule,
        SnakeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },

            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ ]
})
export class AppModuleShared {
}
