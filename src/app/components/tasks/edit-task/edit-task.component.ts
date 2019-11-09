import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: Task;
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [ this.data.title, []],
      description: [this.data.description, []]
    });
  }

  /**
   * @name addNewTask
   * Pass data back from form to create new task
   */
  editTask() {
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
