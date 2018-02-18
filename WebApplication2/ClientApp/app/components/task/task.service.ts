import { Injectable, Inject } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ITask } from './task';



@Injectable()
export class TaskService {
    baseUrl: String;



    /*
    * constructor get Http and the baseUrl
    */
    constructor(private _http: Http,
        @Inject('BASE_URL') baseUrl: string) {
       
        this.baseUrl = baseUrl;
    }


    /*
    * getTask send http get to the server to get the tasks and return Observable
    */
    getTask(userId: string): Observable<any> {
    
        return this._http.get(this.baseUrl + 'api/user/' + userId +'/task')
            .catch(this.handleError);
    }
    private extractData(response: Response) {
        let body = response.json();
        return body.data ;
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

    public getTaskById(userId: string, taskId: string): Observable<any>{
        return this._http.get(this.baseUrl + 'api/user/' + userId + '/task/' + taskId)
            .catch(this.handleError);

    }
    /*
    * createTask send http post to the server  and return Observable
    */
    createTask(userId: string, task: ITask): Observable<any> {
        
        return this._http.post(this.baseUrl + 'api/user/' + userId + '/task', task)
            .catch(this.handleError);
    }


    updateTask(userId: string, task: ITask): Observable<any> {
       
        return this._http.put(this.baseUrl + 'api/user/' + userId + '/task', task)
            .catch(this.handleError);
    }

}