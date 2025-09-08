import { Injectable } from '@angular/core';
import {MessageHistoryDialogComponent} from './message-history-dialog/message-history-dialog.component';
import { environment } from '../ENVIRONMENTS/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

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
    if (messages == null) {
      return;
    }
    Object.keys(messages).forEach(name => {
      messages[name].forEach(
        text => {
          name = name.toUpperCase();
          const term = name + ': ' + text;
          this.messages.push(term);
          if (name === 'ERROR' || name === 'WARNING' || ! environment.production) {
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
