import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    pageTitle: string;
    openNavBar: boolean;
    constructor(private authService: AuthService) {
        this.pageTitle = 'Siso Project';
        this.openNavBar = false;
    }

    open(): void {
        this.openNavBar = true;
    }
    close(): void {
        this.openNavBar = false;
    }

    logOut() {
        this.authService.logout();
    }
}
