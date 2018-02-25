import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { GameBordComponent } from './game-bord.component';
import { GameScoreTableComponent } from './game-score-table.component';
import { GameScoreService } from './game-score.service';


@NgModule({

    imports: [
        CommonModule,
        HttpModule,

        RouterModule.forChild([
            { path: '', component: GameBordComponent },
            { path: 'table-score', component: GameScoreTableComponent }

        ])
    ],
    declarations: [
        GameBordComponent,
        GameScoreTableComponent

    ],
    providers: [GameScoreService

    ]
})
export class SnakeModule { }
