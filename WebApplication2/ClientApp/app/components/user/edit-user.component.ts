import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { IUser } from './user';

@Component({
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
    pageTitle: string;
    errorMessage: string;
    userForm: FormGroup;
    user: IUser;
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
    * ngOnInit set pageTitle  and create userForm to create  IUser
    */

    ngOnInit() {




        this.user = this.authService.currentUser;


        this.pageTitle = 'Edit User';

        this.userForm = this.fb.group({
            firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
            email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)])
        });


        this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: ''
        });

    }

    /*
    * updateUser get the user that the user update and send to the server
    */
    updateUser(): void {
        var user = Object.assign({}, this.userForm.value);

        this.user.email = user.email;
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.password = user.password;


        this.authService.updateUser(this.user).subscribe(result => {
            this.user = result.json as IUser;
            
            
        },
            error => { this.onError(error) });


        this.authService.setUser(this.user, true);
    //    console.log(this.user);
     //   console.log(this.authService.currentUser);
        this.router.navigate(['/home']);

    }
    /*
    * ngOnDestroy reset the taskForm
    */
    ngOnDestroy(): void {
        this.userForm.reset();
    }
    onError(error: any): void {

        console.log(error);
        this.errorMessage = error._body;

    }

}
