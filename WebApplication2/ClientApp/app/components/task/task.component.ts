import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { TaskService } from './task.service';
import { ITask } from './task';

@Component({
  selector: 'pm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})


export class TaskComponent implements OnInit {
    listTasks: ITask[];
    filterTasks: ITask[];
    pageTitle: string;
    errorMessage: string;
    _filteredByName: string;
    _filterStartDate: Date;
    _filterEndtDate: Date;
    /*
    * constructor get ActivatedRoute,Router,TaskService ,AuthService
    */

    constructor(private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private authService: AuthService) { }

    /*
* get filteredByName return the filteredByName
*/
    get filterStartDate(): Date {
        return this._filterStartDate;
    }

    /*
    * set filteredByName set the filteredByName and set new  filterTasks by the filteredByName that we set
    */
    set filterStartDate(filterStartDate: Date) {
  

    }



    /*
    * get filteredByName return the filteredByName
    */
    get filteredByName(): string {     
        return this._filteredByName;
    }

    /*
    * set filteredByName set the filteredByName and set new  filterTasks by the filteredByName that we set
    */
    set filteredByName(filteredByName: string) {
        var compareString = filteredByName.toLowerCase();
        this._filteredByName = filteredByName;
        this.filterTasks = this.listTasks.filter((task) => task.information.toLowerCase().indexOf(compareString) != -1);

    }


   /*
    * ngOnInit set pageTitle  and send get requst to the server to get the ITask[]
    */
    ngOnInit() {
        this.pageTitle = "Welcome " + this.authService.getUserFirstName() + "Here Your Task List";


        this.taskService.getTask(this.authService.getUserId()).subscribe(tasks => {
            this.listTasks = tasks.json() as ITask[];
            this.filterTasks = tasks.json() as ITask[];

        },
            error => this.errorMessage = <any>error);
    }
    /*
    * GetTasks get from the server the json file and convert to ITask[]
    */
    onGetTasks(tasks: any): void {

        this.filterTasks = tasks as ITask[];
        this.listTasks = tasks as ITask[];

       
    }
    /*
    * onError get the error and console it 
    */
    onError(error: any): void {

        console.log(error);
        this.errorMessage = error._body;

    }
    /*
    * showDiffrent get two date and return the diffrent in time 
    */
    showDiffrent(startDate: Date, endDate: Date): number {
        var one_day = 1000 * 60 * 60 * 24;
      
        // Convert both dates to milliseconds
        var date1_ms = new Date(startDate).getTime();
        var date2_ms = new Date(endDate).getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day); 

    }

    







}
