import { TaskService } from './../../../../shared/providers/tasks/task.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { isUndefined, isNull } from 'util';
import { DeleteTaskComponent } from '../../delete-task/delete-task.component';
import { EditTaskComponent } from '../../edit-task/edit-task.component';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  @Input('tasks') tasks: Task[];

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit() {
  }

/**
 * @name markAsDone
 * @param task 
 */
  markAsDone(task: Task): void {
    if(!task.done){
      this.taskService.markAsDone(task);
      this.tasks = this.taskService.getIncompleteTasks();
    }
  }

  /**
   * @name deteleTask
   * @param Task
   */
  deteleTask(task: Task): void {
    if(task.done){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        title: task.title
      };
      const dialogRef = this.dialog.open(DeleteTaskComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(remove => {
        if(remove){
          this.taskService.deleteTask(task);
          this.tasks = this.tasks.filter((tsk) => tsk.id !== task.id);
        }
      });
    }
  }
  editTask(task: Task): void{
    if(!task.done){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        title: task.title,
        description: task.description
      };
      const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(editedTask => {
        
        if(!isUndefined(editedTask) && !isNull(editedTask)){
          task.description = editedTask.description;
          task.title = editedTask.title;
          this.taskService.editTask(task);
        }
      });
    }
  }
}
