

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Snake } from './snake';
import { Point } from './point';
import { AuthService } from '../user/auth.service';
import { GameScoreService } from './game-score.service';
import { IScoreForCreate } from './IScoreForCreate';

@Component({

    templateUrl: './game-bord.component.html',
    styleUrls: ['./game-bord.component.css']
})


export class GameBordComponent implements OnInit, OnDestroy {

 
    pageTitle: string;
    errorMessage: string;
    bord: string[][];
    bollStartGame: boolean;
    BORD_SIZE = 12;
    player: Snake;
    gameRun: number;
    starPoint: Point;
    score: number;
    time: number;
    userScore: IScoreForCreate;

    IMAGE_BLANK = '/img/white_box.gif';
    IMAGE_SNAKE = '/img/black_dot.gif';
    IMAGE_STAR = '/img/star.gif';


    constructor(private authService: AuthService,
               private gameScoreService: GameScoreService) {
       
        window.addEventListener('keyup', (e: any) => {
            switch (e.keyCode) {
                case KEYS.ESC:
                    if (this.bollStartGame) {
                        this.pauseGame();
                    }
                    break;
                case KEYS.SPACE_BAR:
                case KEYS.ENTER:
                    
                    break;
                case KEYS.LEFT:
                    this.player.directionX = 0;
                    this.player.directionY = -1;
                    break;
                case KEYS.UP:
                    this.player.directionX = -1;
                    this.player.directionY =0;
                    break;
                case KEYS.RIGHT:
                    this.player.directionX = 0;
                    this.player.directionY = 1;
                    break;
                case KEYS.DOWN:
                    this.player.directionX = 1;
                    this.player.directionY = 0;
                    break;
            }
        });

    }


    /*
     * ngOnInit set pageTitle  
   */
    ngOnInit() {

        this.gameRun = -1;
        this.bollStartGame = false;
        this.pageTitle = 'Snake Page';
        this.bord = [];
        for (let i = 0; i < this.BORD_SIZE; i++) {
            this.bord[i] = [];
            for (let j = 0; j < this.BORD_SIZE; j++) {
                this.bord[i][j] = this.IMAGE_BLANK;
              
            }
        }
 





    }
    startGame(): void {
        this.time = 1500;
        this.score = 0;
        this.pageTitle = 'Snake Page';
        this.bord = [];
        for (let i = 0; i < this.BORD_SIZE; i++) {
            this.bord[i] = [];
            for (let j = 0; j < this.BORD_SIZE; j++) {
                this.bord[i][j] = this.IMAGE_BLANK;

            }
        }
        this.player = new Snake(Math.floor(this.BORD_SIZE / 2), Math.floor(this.BORD_SIZE / 2), this.BORD_SIZE, this.bord);
        this.starPoint = new Point(0, 0);
        this.bord[this.starPoint.X][this.starPoint.Y] = this.IMAGE_STAR;
        this.bollStartGame = true;

        this.gameRun = setInterval(() => {
            this.updateGame();
        }, this.time);
    }
    pauseGame(): void {
        if (this.bollStartGame) {
            clearInterval(this.gameRun);
        }
        this.bollStartGame = false;
    }
    resumeGame(): void {
        this.bollStartGame = true;
        this.gameRun = setInterval(() => {
            this.updateGame();
        }, this.time);
    }
    updateGame() {

        var gameStatus=  this.player.moveSnake(this.bord);
        if (gameStatus == MoveStatus.EndGame) {
            this.gameOver();
            return;
        }
        else if (gameStatus == MoveStatus.EatFruit) {
            this.eatFruit();
        }
  

    }

    gameOver(): void {
        this.bollStartGame = false;
        this.pageTitle = 'Game Over';
        clearInterval(this.gameRun);
        this.gameRun = -1;

        if (this.authService.isLoggedIn()) {
        //    console.log(this.authService.getUserId());
            this.userScore = {
                userId: this.authService.getUserId(),
                userName: this.authService.getUserFirstName() + " " + this.authService.getUserLastName(),
                score: this.score
            }
            this.gameScoreService.createScore(this.authService.getUserId(), this.userScore).subscribe(result => this.userScore = result.json as IScoreForCreate, error => this.onError(error));
        }

    }
    eatFruit(): void {
        this.score += 100;
        do {
            this.starPoint.X = Math.floor(Math.random() * this.BORD_SIZE);
            this.starPoint.Y = Math.floor(Math.random() * this.BORD_SIZE);
        } while (this.bord[this.starPoint.X][this.starPoint.Y] != this.IMAGE_BLANK);
        this.bord[this.starPoint.X][this.starPoint.Y] = this.IMAGE_STAR;
        this.time -= 50; 
        clearInterval(this.gameRun);
        this.gameRun = setInterval(() => {
            this.updateGame();
        }, this.time);

    }
    /*
* onError get the error and console it 
*/
    onError(error: any): void {

        console.log(error);
        this.errorMessage = error._body;

    }
    /*
 * ngOnDestroy  
 */
    ngOnDestroy(): void {
        if (this.bollStartGame) {
            clearInterval(this.gameRun);
        }

    }



}
export enum MoveStatus {
    EndGame= 1,
    OK= 0,
    EatFruit= 2,
};
export const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ESC: 27,
    SPACE_BAR: 32,
    ENTER: 13
};

