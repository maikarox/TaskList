import { TaskService } from './../../shared/providers/tasks/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddTaskComponent } from './add/add-task/add-task.component';
import { isUndefined, isNull } from 'util';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  todoTasks: Task[];
  doneTasks: Task[];
  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.todoTasks = this.taskService.getIncompleteTasks();
    this.doneTasks = this.taskService.getDoneTasks();
  }

  ngOnInit() {
    
  }

  addNewTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(newTask => {
      if(!isUndefined(newTask) && !isNull(newTask)){
        let time = new Date();
        const id = 'task-'+time.getTime();
        const taskToCreate = new Task(id, newTask.title, newTask.description, false, new Date(), null);
        this.taskService.createTask(taskToCreate);
      }
    });
  }
}
