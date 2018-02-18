import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    pageTitle: string;
    constructor(private authService: AuthService) {
        this.pageTitle = 'Siso Project';
    }


    logOut() {
        this.authService.logout();
    }
}
