import { Injectable } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MessageHistoryDialogComponent} from './message-history-dialog/message-history-dialog.component';
import { environment } from '../environments/environment';

@Injectable()
export class AlertService {

  messages: string[] = [];
  viewMessagesVisible = false;

  constructor(
    private matSnackbar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  showToast(message: string, action: string, duration: number) {
    this.matSnackbar.open(message, action, {duration: duration});
  }

  showMessages(messages) {
    Object.keys(messages).forEach(name => {
      messages[name].forEach(
        text => {
          name = name.toUpperCase();
          if (name === 'ERROR' || name === 'WARNING' || ! environment.production) {
            const term = name + ': ' + text;
            this.messages.push(term);
            this.viewMessagesVisible = false;
            this.matSnackbar.open(
              term,
              'Dismiss',
              {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 3000
              }
            ).onAction().subscribe(() => {
              this.showHistoryButton();
            });
          }
        }
      )
    });
  }


  showMessageHistoryDialog() {
    let dialogRef = this.dialog.open(MessageHistoryDialogComponent, {
      width: '250px',
      data: this.messages
    });
    dialogRef.afterClosed().subscribe(r => {
      // this.showHistoryButton();
    });
  }

  showHistoryButton() {
    this.matSnackbar.open('', 'View Messages', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    })
      .onAction().subscribe(() => {
        this.showMessageHistoryDialog();
        // this.matSnackbar.dismiss();
    });
  }
}
