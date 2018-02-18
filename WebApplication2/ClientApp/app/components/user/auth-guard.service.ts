import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {


    /*
    * constructor get Router,AuthService
    */
    constructor(private router: Router,
        private authService: AuthService) {
    }


     /*
    * canLoad check if the user is log in and return boolean
    */
    canLoad(route: Route): boolean  {
        var url;
        if (route.path == undefined) {
            url = '';
        }
        else {
            url = route.path;
        }
        return this.checkLoggedIn(url);
    }


    /*
    * canActivate check if the user is log in and return boolean
    */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    /*
    * checkLoggedIn check if the user is log in and return boolean if not navigate to login page
    */
    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}