
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IUser } from './user';

@Component({

    templateUrl: './newuser.component.html',
    styleUrls: ['./newuser.component.css']
})

export class NewUserComponent implements OnInit, OnDestroy {
    
    user: IUser;
    pageTitle: string;
    errorMessage: string;
    userForm: FormGroup;
 
     /*
    * constructor get ActivatedRoute,Router ,AuthService ,FormBuilder
    */
    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService 
       ) {
    }

    /*
    * ngOnInit set pageTitle  and create userForm to create  New User
    */

    ngOnInit() {

        this.pageTitle = 'New User';
        /*
        * this is bla
        */
        this.userForm = this.fb.group({
            firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
            email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)])
        });

    }


    /*
    * saveUser get the user from the form   and send post request to the server
    */
    saveUser() {
     

        let p = Object.assign({},  this.userForm.value);

        this.authService.newUser(p).subscribe(
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

   /*
    * ngOnDestroy  reset the userForm
    */
    ngOnDestroy(): void {
        this.userForm.reset();
    }
    
    
    

}