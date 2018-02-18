

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Snake } from './snake';
import { Point } from './point';



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


    IMAGE_BLANK = '/img/white_box.gif';
    IMAGE_SNAKE = '/img/black_dot.gif';
    IMAGE_STAR = '/img/star.gif';


    constructor() {
       
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
            this.bollStartGame = false;
            this.pageTitle = 'Game Over';
            clearInterval(this.gameRun);
            this.gameRun = -1;
            return;
        }
        else if (gameStatus == MoveStatus.EatFruit) {
            this.eatFruit();
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

