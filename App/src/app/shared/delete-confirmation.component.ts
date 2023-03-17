import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  template: `
  <div class="wrapper">
  <h1 mat-dialog-title class="title">Confirm Deletion</h1>
  <p mat-dialog-content class="content">Are you sure you want to delete this patient?</p>
  <div mat-dialog-actions class="buttons-div">
    <button mat-button (click)="cancel()" class="button cancel-button">Cancel</button>
    <button mat-button color="warn" (click)="confirm()" class="button delete-button">Delete</button>
  </div>
  </div>

`,
styles: [
  `
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }

  .title {
  color: red;
  font-size: 16px;
  font-weight: bold;
  }


    .content {
      font-size: 14px;
    }

    .buttons-div {
      display: flex;
      justify-content: flex-end;
      gap:5px;
    }

    .button {
      font-size: 14px;
      font-weight: bold;
      padding: 8px 16px;
    }

  `
]


})

export class DeleteConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
