import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  /**
   * @name addNewTask
   * Pass data back from form to create new task
   */
  deleteTask() {
    this.dialogRef.close(true);
  }

  /**
   * @name close()
   * Close dialog without action
   */
  close() {
    this.dialogRef.close(false);
  }
}
