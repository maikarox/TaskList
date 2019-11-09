import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/shared/models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newTask: Task;
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', []],
      description: ['', []],

    });
  }

  /**
   * @name addNewTask
   * Pass data back from form to create new task
   */
  addNewTask() {
    if (this.form.value.title !== '' && this.form.value.description !== '') {
      this.dialogRef.close(this.form.value);
    }
  }

  /**
   * @name close()
   * Close dialog without action
   */
  close() {
    this.dialogRef.close();
  }

}
