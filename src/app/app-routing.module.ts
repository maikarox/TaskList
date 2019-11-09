import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/tasks/add/add-task/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'task-list' },
  { path: 'task-list', component: TasksComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'edit-task', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
