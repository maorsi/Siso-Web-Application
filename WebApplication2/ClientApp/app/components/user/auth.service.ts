import { Injectable, Inject } from '@angular/core';
import { IUser } from './user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { INewUser } from './INewUser';
import { Login } from './login';


@Injectable()
export class AuthService {
    _currentUser: IUser;
    userLogin: boolean;
    baseUrl: String


    /*
    * constructor get Http and the baseUrl
    */

    constructor(private http: Http,
        @Inject('BASE_URL') baseUrl: string) {
        this.userLogin = false;
        this.baseUrl = baseUrl;
    }

    /*
    * isLoggedIn  return if the user is Log in
    */
    isLoggedIn(  ): boolean {
        return this.userLogin;
    }


    /*
    * login get the user login information  and send post request to the server and return Observable 
    */
    login(userlogin: Login) : Observable<IUser> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.getUserLogin(userlogin, options);
    }
    /*
    * getUserFirstName  return user firstName
    */
    getUserFirstName(): string {
        return this._currentUser.firstName;
    }

    /*
    * getUserId  return user id
    */
    getUserId(): string {
        return this._currentUser.id;
    }


   /*
    * logout  log out the user
    */
    logout(): void {
        this.userLogin = false;
        this._currentUser = {
            id: '',
            firstName: '',
            lastName: '',
            password: '',
            email: ''

        }
    }
    get currentUser(): IUser {
        return this._currentUser;
    }
    /*
    * set User 
    */
    setUser(user: IUser, userLogin: boolean): void {

        this._currentUser = user;
        this.userLogin = userLogin;
    }


    /*
    * newUser get the user  information  and send post request to the server and return Observable
    */
    newUser(user: INewUser): Observable<IUser> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.createNewUser(user, options);
    }

    updateUser(user: INewUser): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.put(this.baseUrl + 'api/User', user, options)   
                         .catch(this.handleError);
    }
    /*
    * createNewUser  send post request to the server and return Observable
    */
    private createNewUser(user: INewUser, options: RequestOptions): Observable<IUser> {

        return this.http.post(this.baseUrl + 'api/User/AddUser', user, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
    * getUserLogin  send post request to the server and return Observable
    */
    private getUserLogin(userlogin: Login, options: RequestOptions): Observable<IUser> {

        return this.http.post(this.baseUrl + 'api/User/LoginUser', userlogin, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /*
    * extractData  extract the data that return from the server 
    */
    private extractData(response: Response) {
        this.userLogin = true;
        let body = response.json();
       
        this._currentUser = Object.assign({}, this.currentUser, body);


        return this._currentUser;
    }

    /*
    * handleError console the error and return  Observable.throw of the error
    */
    private handleError(error: Response): Observable<any> {
        this.userLogin = false;
        console.error(error);
        return Observable.throw(error);
    }
}
