import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-message-history-dialog',
    templateUrl: './message-history-dialog.component.html',
    styleUrls: ['./message-history-dialog.component.css'],
    standalone: false
})
export class MessageHistoryDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<MessageHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
