import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    pageTitle: string;
    pageBody: string;
    constructor() {
        this.pageTitle = 'Welcome to Maor Siso project! ';
        this.pageBody = '<p>Hello, </p> ' +
            '<li>The project is built using Asp.Net Core for the server side </li>' +
          '  <li>When the client side was written in Angular </li> ' +
           ' <li>The project is a site that lets you manage tasks </li>' +
           ' <li> When there is a requirement to register the site for use </li> </ul> ' +
            '<p>I hope you will love him and good luck</p>';
    }
}
