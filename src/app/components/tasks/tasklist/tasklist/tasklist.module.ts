import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteTaskComponent } from '../../delete-task/delete-task.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DeleteTaskComponent
  ],
  entryComponents: [DeleteTaskComponent]
})
export class TasklistModule { }
