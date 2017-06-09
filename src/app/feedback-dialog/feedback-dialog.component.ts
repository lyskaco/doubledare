import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SharedService } from '../shared.service';
import { DialogServiceService } from '../dialog-service.service';


@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})

export class FeedbackDialogComponent implements OnInit {
  userID;
  grades = [1,2,3,4,5];
  suggestions : string;
  designFeedback : number;
  functionalityFeedback : number;
  experienceFeedback : number;
  sendFormMessage;
  constructor( private dialog : MdDialogRef<FeedbackDialogComponent>,
   private sharedService : SharedService) { }

  sendForm() {
  	let data = {
  		suggestions: this.suggestions,
  		designFeedback : this.designFeedback,
  		functionalityFeedback : this.functionalityFeedback,
  		experienceFeedback : this.experienceFeedback,
  		userID : this.userID
  	}
  	this.sharedService.sendFeedbackForm(data).subscribe(res=>{
  		this.sendFormMessage = res;
  		this.dialog.close();
  		// this.dialogService.openDialog('Done', 'Feedback sent!');
  	})
  	

  }
  ngOnInit() {
  	this.userID = this.dialog.config.data.uid;
  }

}
