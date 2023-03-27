import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation',
  template: `
  <div class="wrapper">
  <h1 mat-dialog-title class="title">Confirm Logout</h1>
  <p mat-dialog-content class="content">Are you sure you want to logout?</p>
  <div mat-dialog-actions class="buttons-div">
    <button mat-button color="warn" (click)="confirm()" class="btn btn-primary button delete-button">Logout</button>
    <button mat-button (click)="cancel()" class="btn btn-secondery button cancel-button">Cancel</button>
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

export class logoutConfirmation {
  constructor(private dialogRef: MatDialogRef<logoutConfirmation>) { }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
