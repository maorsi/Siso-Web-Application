import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITask } from './task';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './task.service';
import { AuthService } from '../user/auth.service';

@Component({
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy {
    user: ITask;
    pageTitle: string;
    errorMessage: string;
    taskForm: FormGroup;
    

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

        this.pageTitle = 'Create Task';

        this.taskForm = this.fb.group({
            information: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required])       
        });

    }

    /*
    * updateTask get the task that the user create and send to the server
    */
     createTask(): void {
        var task = Object.assign({}, this.taskForm.value);
        

        this.taskService.createTask(this.authService.getUserId(), task).subscribe((result) => {
        
        }, (error) => console.log(error));
           
        this.router.navigate(['/task-list']);

    }
    /*
    * ngOnDestroy reset the taskForm
    */
  ngOnDestroy(): void {
      this.taskForm.reset();
  }

}
