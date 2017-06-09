import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Auth } from '../auth.service';
@Component({
  selector: 'app-events-general',
  templateUrl: './events-general.component.html',
  styleUrls: ['./events-general.component.scss']
})
export class EventsGeneralComponent implements OnInit {
	toggleChoiceFilter : string = 'all';
  toggleChoiceStatus : string = 'all';
  isModeratorVar : boolean;
  yourBetsToggle : string = 'userCreated';
  allEventsUserCreated;
  allEventsUserParticipates;
  allEvents;
  user;
  constructor(private auth : Auth, private sharedService : SharedService) { }

  ngOnInit() {
  	this.getUser().then(res=> {
      this.isModerator(res);
  		this.getAllEvents();
  		this.getEventsUserCreated(res);
  		this.getEventsUserParticipates(res);
  	})
  }


  getUser() {
  	return new Promise((resolve,reject)=> {
  		this.auth.user$.subscribe(res=>{this.user = res
        if(this.user) {
          resolve(this.user);
      }
      })
  		
  	})
  }
  isModerator(param) {
    if(param.permission==='moderator') {
       this.isModeratorVar = true;
    }
  }
  deleteEvent(event) {
    let rejectionDescription = prompt('Write the reason of deleting the event.'),
        eventData = event;

    if(rejectionDescription) {
      this.sharedService.deleteEvent(eventData.idRoom, rejectionDescription).subscribe(res=> {
          if(res.result==='success') {
              this.getAllEvents();
          }
      })
    }

  }
  swipeRouter(where, ev) {
    this.sharedService.swipeRouter(where);
  }
  getEventsUserCreated(param) {
    let id = param.id;
    this.sharedService.getEventsUserCreated(id).subscribe(res => {this.allEventsUserCreated = res.userData;});
  }
  getEventsUserParticipates(param) {
    let id = param.id;
    this.sharedService.getEventsUserParticipates(id).subscribe(res => {this.allEventsUserParticipates = res.userData;})
  }
  getAllEvents() {
    this.sharedService.getAllEvents().subscribe(res => { this.allEvents = res.eventsData; console.log(this.allEvents)})
  }
}
