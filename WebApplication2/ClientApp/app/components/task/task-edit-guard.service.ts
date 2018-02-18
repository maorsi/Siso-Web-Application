import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditTaskComponent } from './edit-task.component';



@Injectable()
export class TaskEditGuard implements CanDeactivate<EditTaskComponent> {

    canDeactivate(component: EditTaskComponent): boolean {
        if (component.taskForm.dirty) {
            let taskName = component.task.information || 'New Product';
            return confirm(`Navigate away and lose all changes to ${taskName}?`);
        }
        return true;
    }
}
