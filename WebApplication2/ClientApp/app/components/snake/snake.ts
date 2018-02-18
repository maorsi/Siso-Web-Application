import { Point } from "./point";
import { MoveStatus } from "./game-bord.component";

export class Snake {
    locationOnBord: Point[];
    directionX: number;
    directionY: number;
    bordBorder: number;
    IMAGE_BLANK = '/img/white_box.gif';
    IMAGE_SNAKE = '/img/black_dot.gif';
    IMAGE_STAR = '/img/star.gif';

    constructor(x: number, y: number, bordBorder: number , bord:string[][]) {
        this.locationOnBord = [];
        this.locationOnBord[0] = new Point(x, y);
        this.bordBorder = bordBorder;
        this.directionX = -1;
        this.directionY = 0;
        bord[this.locationOnBord[0].X][this.locationOnBord[0].Y] = this.IMAGE_SNAKE;

    }
    get LocationOnBord(): Point[] {
        return this.locationOnBord;
    }
    set LocationOnBord(locationOnBord: Point[]) {
        this.locationOnBord = locationOnBord;
    }
    moveSnake(bord: string[][]): MoveStatus{
 
        var x = this.locationOnBord[this.locationOnBord.length-1].X;
        var y = this.locationOnBord[this.locationOnBord.length - 1].Y;
        for (var index = this.locationOnBord.length - 1; index >= 0; index--) {
            if (index == 0) {
                this.locationOnBord[index].X += this.directionX;
                this.locationOnBord[index].Y += this.directionY;
                if (this.locationOnBord[index].X < 0 || this.locationOnBord[index].X >= this.bordBorder ||
                    this.locationOnBord[index].Y < 0 || this.locationOnBord[index].Y >= this.bordBorder)
                    return MoveStatus.EndGame;


                if (this.locationOnBord.filter(point => point === this.locationOnBord[0]).length != 1) {
                    return MoveStatus.EndGame;
                }

                if (bord[this.locationOnBord[index].X][this.locationOnBord[index].Y] == this.IMAGE_STAR) {

                    this.locationOnBord[this.locationOnBord.length] = new Point(x,y);

                    bord[this.locationOnBord[index].X][this.locationOnBord[index].Y] = this.IMAGE_SNAKE;
                    return MoveStatus.EatFruit;
                }
                bord[this.locationOnBord[index].X][this.locationOnBord[index].Y] = this.IMAGE_SNAKE;

            }
            else {
                this.locationOnBord[index].x = this.locationOnBord[index - 1].x;
                this.locationOnBord[index].y = this.locationOnBord[index - 1].y;

            }

        }

        bord[x][y] = this.IMAGE_BLANK;

        return MoveStatus.OK;
    }
    set DirectionX(directionX: number) {
        this.directionX = directionX;
    }
    get DirectionX(): number {
        return this.directionX;
    }
    set DirectionY(directionY: number) {
        this.directionY = directionY;
    }
    get DirectionY(): number {
        return this.directionY;
    }

}
