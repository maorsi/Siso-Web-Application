import { Injectable, Inject } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IScoreForCreate } from './IScoreForCreate';
import { IScore } from './IScore';




@Injectable()
export class GameScoreService {
    baseUrl: String;



    /*
    * constructor get Http and the baseUrl
    */
    constructor(private _http: Http,
        @Inject('BASE_URL') baseUrl: string) {

        this.baseUrl = baseUrl;
    }


    /*
    * get top 5 score from the server
    */
    getTop5(): Observable<any> {

        return this._http.get(this.baseUrl + 'api/SnakeGame')
            .catch(this.handleError);
    }


    private extractData(response: Response) {
        let body = response.json();
        return body.data;
    }
    /*
    * handleError console the error and return  Observable.throw of the error
    */
    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public getScoreById(userId: string): Observable<any> {
        return this._http.get(this.baseUrl + 'api/SnakeGame/' + userId )
            .catch(this.handleError);

    }
    /*
    * createScore send http post to the server  and return Observable
    */
    createScore(userId: string, score: IScoreForCreate): Observable<any> {

        return this._http.post(this.baseUrl + 'api/SnakeGame/' + userId, score)
            .catch(this.handleError);
    }
     /*
    * updateScore send http put to the server  and return Observable
    */

    updateScore(userId: string, score: IScore): Observable<any> {

        return this._http.put(this.baseUrl + 'api/SnakeGame', score)
            .catch(this.handleError);
    }

}