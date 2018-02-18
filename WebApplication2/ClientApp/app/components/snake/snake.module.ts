import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { GameBordComponent } from './game-bord.component';


@NgModule({

    imports: [
        CommonModule,
        HttpModule,
    //    FormsModule,
  //      ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'snake', component: GameBordComponent }


        ])
    ],
    declarations: [
        GameBordComponent,


    ],
    providers: [

    ]
})
export class SnakeModule { }
