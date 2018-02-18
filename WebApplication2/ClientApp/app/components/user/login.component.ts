

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IUser } from './user';

@Component({

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy {


    user: IUser;
    pageTitle: string;
    errorMessage: string;
    loginForm: FormGroup;


   /*
    * constructor get ActivatedRoute,Router ,AuthService ,FormBuilder
    */
    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService)
    { }


     /*
    * ngOnInit set pageTitle  and create loginForm  to get  Login information
    */
    ngOnInit() {

        this.pageTitle = 'Login Page';

        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)])
        });

    }

       /*
    * ngOnDestroy  reset the loginForm
    */
    ngOnDestroy(): void {
        this.loginForm.reset();
    }


    /*
    * loginUser get the user login information from the form   and send post request to the server
    */
    loginUser(): void {
        let p = Object.assign({}, this.loginForm.value);
      //  console.log(p);
        this.authService.login(p).subscribe(
            (user: any) => this.onUserLogin(user),
            (error: any) => this.onError(error)
        );
    }

     /*
    * onUserLogin get the user from the request   and navigate back to home page
    */

    onUserLogin(user: any): void {
        this.user = user;
        this.authService.setUser(user, true);
        this.router.navigate(['/home']);
    }

    /*
    * onError console the error to the user and update errorMessage 
    */
    onError(error: any): void {

        console.log(error);
        this.errorMessage = error._body;

    }
}