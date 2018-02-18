import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITask } from './task';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './task.service';
import { AuthService } from '../user/auth.service';

@Component({
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
    task: ITask;
    pageTitle: string;
    errorMessage: string;
    taskForm: FormGroup;
    taskId: string;

    /*
* constructor get ActivatedRoute,Router,TaskService ,AuthService ,FormBuilder
*/

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private taskService: TaskService
    ) {
    }

    /*
    * ngOnInit set pageTitle  and create taskForm to create  ITask
    */

    ngOnInit() {

        this.taskId = this.route.snapshot.params['id'];

        this.taskService.getTaskById(this.authService.getUserId(), this.taskId).subscribe(task => {
            this.task = task.json() as ITask;
            this.updateForm();
   
        },
            error => this.errorMessage = <any>error);

        this.pageTitle = 'Edit Task';

        this.taskForm = this.fb.group({
            information: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required])
        });

    }
    updateForm(): void {
        this.task.startDate = new Date(this.task.startDate);
        this.task.endDate = new Date(this.task.endDate);

        this.taskForm.patchValue({
            information: this.task.information,
            startDate: this.task.startDate.toISOString().substring(0, 10),
            endDate: this.task.endDate.toISOString().substring(0, 10)
        });
    }
    /*
    * updateTask get the task that the user update and send to the server
    */
    updateTask(): void {
        var task = Object.assign({}, this.taskForm.value);
        this.task.information = task.information;
        this.task.startDate = task.startDate;
        this.task.endDate = task.endDate;

        this.taskService.updateTask(this.authService.getUserId(), this.task).subscribe((result) => {
           
        }, (error) => console.log(error));
        this.taskForm.reset();
        this.router.navigate(['/task-list']);

    }
    /*
    * ngOnDestroy reset the taskForm
    */
    ngOnDestroy(): void {
        this.taskForm.reset();
    }
    onError(error: any): void {

        console.log(error);
        this.errorMessage = error._body;

    }

}
