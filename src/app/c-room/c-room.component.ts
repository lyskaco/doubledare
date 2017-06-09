import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {Auth} from '../auth.service';
import { DialogServiceService} from '../dialog-service.service';
import { Router } from '@angular/router';
export interface APIResult {
	result?: string;
	message : string;
  token : string;
}
@Component({
  selector: 'app-c-room',
  templateUrl: './c-room.component.html',
  styleUrls: ['./c-room.component.scss']
})

export class CRoomComponent implements OnInit {


  userSession;
  idUser;
  userName;
  submitBlock : boolean = false;
  eventEndTime : Date;
  eventCloseTime : Date;
  statementContent : string;
  userNameEvent : string;
  sideSelected : string;
  amountPoints : number;
  submitAfterMessage : APIResult = 
  {result:'',
   message: '',
   token: ''};
  constructor(private auth: Auth, private sharedService : SharedService, private router : Router, private dialogService : DialogServiceService) { 
      this.auth.user$.subscribe(res => {this.userSession = res})
  }

  ngOnInit() {
  	this.idUser = this.userSession.id;
    this.userName = this.userSession.userName;
  }
   swipeRouter(where, ev) {
    this.sharedService.swipeRouter(where);
  }
  submitEvent() {
  		
    this.submitBlock = true;
  	function validateEvent(eventData)  {

  		let nowDate = new Date();
  		if (nowDate > eventData.endTime || nowDate > eventData.endTimeBet) {
  			this.submitAfterMessage.message = 'Event must take place in the future!';
        this.submitBlock = false;
  			return false;
  		}
  		if (eventData.endTime < eventData.endTimeBet) {
  			this.submitAfterMessage.message = 'Closing bet time cannot be later than event endtime!';
        this.submitBlock = false;
  			return false;
  		}
  		if (eventData.statement.charAt(eventData.statement.length - 1) === '?') {
  			this.submitAfterMessage.message = 'Statement must not end with question mark!';
        this.submitBlock = false;
        return false;
  		}
  		return true
  	}

  	let data = {
  		id : this.idUser,
  		endTimeString : this.eventEndTime.toString(),
  		endTimeBetString : this.eventCloseTime.toString(),
      endTime : this.eventEndTime,
      endTimeBet : this.eventCloseTime,
  		statement : this.statementContent,
  		roomPoint : this.amountPoints,
      userName : this.userNameEvent,
      side : '1',
      timeStamp : (new Date).toString()
  	}

    console.log(data);
  	if(validateEvent.call(this, data)) {
  		this.sharedService.submitEvent(data).subscribe(res => {
    		this.submitAfterMessage = res;
        this.submitBlock = false;
      // this.eventEndTime = undefined;
      // this.eventCloseTime = undefined;
      // this.statementContent = undefined;
      // this.amountPoints = 0;
  		if(this.submitAfterMessage.result === 'success') {
        this.dialogService.openDialog('Success', 'Event successfully added!');
  			setTimeout(()=>{ this.router.navigateByUrl('room/'+this.submitAfterMessage.token)}, 500)
  		}  else {
        this.dialogService.openDialog('Failure', this.submitAfterMessage.message);
      }
  	});
  	} 
  	
}
}
