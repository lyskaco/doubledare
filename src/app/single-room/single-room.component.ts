import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { SharedService } from '../shared.service';
import { Auth } from '../auth.service';
import { MdDialog, MdDialogRef} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.scss']
})
export class SingleRoomComponent implements OnInit {

  eventData : any;
  eventToken;
  afterJoinMessageError;
  isParticipating : boolean;
  isHost : boolean;
  isModerator : boolean;
  hostActionPerformed : boolean;
  toggleParticipantSide : string = "positive";
  userSession;
  constructor(private auth: Auth, private dialog : MdDialog, private route : ActivatedRoute, private sharedService : SharedService) { 
    this.auth.user$.subscribe(res=> {this.userSession = res})
  }

  ngOnInit() {
  	this.getRoute().then(res => {
  		this.eventToken = res;
  		this.getEventData(res);
  	})
  }

  getRoute() {
  	return new Promise((resolve, reject) => {
  		this.route.params.subscribe(res=> {
  			resolve(res)
  		})
  	})
  }

  isParticipatingFunc(params) {
  	let id = this.userSession.id,
  		eventData = params;
  		for(let i = 0; i<eventData.participantDataNegative.length; i++) {
  			console.log(i);
  			if(eventData.participantDataNegative[i].id === id) {
  				this.isParticipating = true;
  				return true;
  			}
  		}

  		for(let i = 0; i<eventData.participantDataPostive.length; i++) {
  			if(eventData.participantDataPostive[i].id === id) {
  				this.isParticipating = true;
  				return true;
  			}
  		}
  }
  isHostFunc(params) {
  	let idHost = params.idHost,
  		userId = this.userSession.id,
      userPermissions = this.userSession.permission;

  		if(userPermissions === 'moderator') {
  			this.isModerator = true;
  		}
  }
  getEventData(param) {
  	let id = param.id;
  	this.sharedService.getSingleEventDetails(id).subscribe(res => {
      if(res.eventDetails) {
  		this.eventData = res.eventDetails;
  		this.isParticipatingFunc(res.eventDetails);
  		this.isHostFunc(res.eventDetails); 
  		console.log(this.eventData);
    } else {
        alert('Event not found');
        this.sharedService.redirectMeAnywhere('dashboard');
    }
  	});
  }
  hostDecideSide(side) {
    let whatSide = side,
        idRoom = this.eventData.idRoom,
        participantsNumberNegative = this.eventData.participantsNumberNegative,
        participantsNumberPositive = this.eventData.participantsNumberPositive,
        allPoints = this.eventData.allPoints;

        this.hostActionPerformed = true;
        this.sharedService.hostDecideSide(idRoom, whatSide, allPoints, participantsNumberNegative, participantsNumberPositive).subscribe(res => {
        this.getEventData(this.eventToken);
        this.hostActionPerformed= false;

        })
  }
  confirmDialog(title: string, message: string) : Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmationDialogComponent>;

        dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: title,
            message : message
          }
        });
        console.log(dialogRef.afterClosed());
        return dialogRef.afterClosed();
  }
  joinEvent(side) {
  	let whatSide = side,
  		idParticipant = this.userSession.id,
  		idRoom = this.eventData.idRoom,
  		roomPoint = this.eventData.roomPoint;

      this.confirmDialog('Confirmation dialog', 'Are you sure you want to participate?').subscribe(res=> {
        if(res){
        this.sharedService.joinEvent(idParticipant, idRoom, whatSide, roomPoint).subscribe(res => 
          {
            if(res.result === 'success') {
             this.getEventData(this.eventToken)
          } else {
            this.afterJoinMessageError = res.message;
          }
          
    })
        }});

  

  }
}
