

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Snake } from './snake';
import { Point } from './point';
import { GameScoreService } from './game-score.service';
import { IScore } from './IScore';



@Component({
    selector: 'score-table',
    templateUrl: './game-score-table.component.html',
    styleUrls: ['./game-score-table.component.css']
})


export class GameScoreTableComponent implements OnInit, OnDestroy {


    pageTitle: string;
    errorMessage: string;
    tableScore: IScore[];

    constructor(private gameScoreService: GameScoreService) {


    }


    /*
     * ngOnInit set pageTitle  
   */
    ngOnInit() {
        this.pageTitle = 'Top 5 Scores'; 
        this.gameScoreService.getTop5().subscribe(
            result => this.tableScore = result.json(),
            error => this.onError(error));



    }


    /*
 * ngOnDestroy  
 */
    ngOnDestroy(): void {


    }

    /*
* onError console the error to the user and update errorMessage 
*/
    onError(error: any): void {

        console.log(error);
        this.errorMessage = error._body;

    }

}


