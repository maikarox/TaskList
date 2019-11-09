import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskService } from './shared/providers/tasks/task.service';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { MatGridListModule, MatListModule, MatCardModule, MatDialogModule, MatIconModule, MAT_DIALOG_DEFAULT_OPTIONS, MatFormFieldModule, MatInputModule} from '@angular/material';
import { AddTaskComponent } from './components/tasks/add/add-task/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { TasklistComponent } from './components/tasks/tasklist/tasklist/tasklist.component';
import { LocalStorageService } from './shared/storage/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteTaskComponent } from './components/tasks/delete-task/delete-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    TasklistComponent,
    DeleteTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    TaskService,
    LocalStorageService, 
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [DeleteTaskComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
