import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { AuthGuard } from '../user/auth-guard.service';
import { CreateTaskComponent } from './create-task.component';
import { EditTaskComponent } from './edit-task.component';
import { TaskService } from './task.service';
import { TaskEditGuard } from './task-edit-guard.service';


@NgModule({

    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
       
        RouterModule.forChild([
            { path: 'list', component: TaskComponent },
            { path: '', component: CreateTaskComponent },
            { path: ':id', component: EditTaskComponent, canDeactivate: [TaskEditGuard] },

        ])
    ],
    declarations: [
        TaskComponent,
        CreateTaskComponent,
      
        EditTaskComponent

    ],
    providers: [TaskService, TaskEditGuard

    ]
})
export class TaskModule { }
