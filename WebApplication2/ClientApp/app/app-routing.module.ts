import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/user/auth-guard.service';



@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
                 {
                      path: 'task',
                      canActivate: [AuthGuard],
             //         data: { preload: true },
                      loadChildren: './components/task/task.module#TaskModule'
            },
                 {
                     path: 'snake',
                     
                     data: { preload: true },
                     loadChildren: './components/snake/snake.module#SnakeModule'
                 },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
