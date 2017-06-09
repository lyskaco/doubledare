import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
import { Observable , BehaviorSubject } from 'rxjs/Rx';

import {NotifyDialogComponent} from './notify-dialog/notify-dialog.component';
import {FeedbackDialogComponent} from  './feedback-dialog/feedback-dialog.component';
@Injectable()
export class DialogServiceService {
innerWidth: any;
  constructor(private dialog : MdDialog) {
      this.innerWidth = window.screen.width;
   }

   openDialog(title, message) {
   		let titleDialog = title,
   			messageDialog = message;

   			let dialogRef = this.dialog.open(NotifyDialogComponent, {
   				data: {
   					title : titleDialog,
   					message : messageDialog
   				}
   			})
   }

   openFeedbackDialog(uid) : Observable<any> {
      let width;
      let mq = window.matchMedia( "(max-width: 760px)" );
      if(mq.matches) {
         width = '100%';
      } else {
         width = '50%'
      }
      let userID = uid;
      let dialogRef = this.dialog.open(FeedbackDialogComponent, {
         width : width,
         data : {
           
            uid : userID
         }
      })

       return dialogRef.afterClosed();
   }
}
