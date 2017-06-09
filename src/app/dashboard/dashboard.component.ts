import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { DialogServiceService } from '../dialog-service.service';
import { SharedService } from '../shared.service';
import { FileUploader } from 'ng2-file-upload';
import { Observable ,BehaviorSubject } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {MdDialog } from '@angular/material';
import {DialogUsernameComponent} from '../dialog-username/dialog-username.component';
export interface User {
  userName : string,
	firstName: string,
	lastName: string,
	email: string,
  id : number,
	picture?: any
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  // ssEmail = JSON.parse(sessionStorage.getItem('user'));
  ssEmail;
  user : User;
  userData;
  toggleChoiceFilter : string = 'all';
  fileUploadSpinner : boolean = false;
  formData :FormData = new FormData();
  yourBetsToggle : string = 'userCreated'; // responsible for selecting between ev usr created/participating
  
  allEvents;
  allEventsUserCreated;
  allEventsUserParticipates;
  
  constructor(private dialogService : DialogServiceService, private dialog : MdDialog, private authService : Auth, private http : Http, private sharedService : SharedService) { 
    this.authService.user$.subscribe(res=> {this.ssEmail = res});
  }
  ngOnInit() {
      
        this.getUserData().then(res => {
        // @API CALL
        this.getAllEvents();
        this.getEventsUserCreated(res);
        this.getEventsUserParticipates(res);
      })
      // this.retrieveSessionUser(function(){ this.getUserData()}.bind(this))
       
      // this.sharedService.getAllEvents().subscribe(res => {
      //   this.allEvents = res
      // })
     

  }
  
  // retrieveSessionUser(callback) {
  //     this.authService.user$.subscribe(res => this.userData = res)
  //     callback(this.userData);
  // }
  openFeedbackDialog() {
    let id = this.user.id;
    this.dialogService.openFeedbackDialog(id).subscribe(res=>console.log(res));
  }
  openUserNameDialog() {
    let dialogRef = this.dialog.open(DialogUsernameComponent, {
    data: {
      id : this.user.id
    }

  });
    dialogRef.afterClosed().subscribe(result => {
       this.getUserData();
    });
  }
  swipeRouter(where) {
    this.sharedService.swipeRouter(where);
  }
  getEventsUserCreated(param) {
    let id = param.id;
    this.sharedService.getEventsUserCreated(id).subscribe(res => {this.allEventsUserCreated = res.userData;});
  }
  getEventsUserParticipates(param) {
    let id = param.id;
    this.sharedService.getEventsUserParticipates(id).subscribe(res => {this.allEventsUserParticipates = res.userData; console.log(this.allEventsUserParticipates )})
  }
  getAllEvents() {
    this.sharedService.getAllEvents().subscribe(res => { this.allEvents = res.eventsData})
  }
  getUserData() {

    return new Promise((resolve, reject) => {

       this.authService.getUserData(this.ssEmail.email).subscribe(res => {
       this.user = res.userData;
       this.authService.setUserObject(this.user);
       resolve(this.user);
      })

    })
              
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let id = this.user.id;
        this.formData.append('newFile', file, file.name);
        this.formData.append('id', id);
        this.fileUploadSpinner = true;
        this.http.post(`//serwer1763147.home.pl/bettingApp/api/upload`, this.formData)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => { this.getUserData(); this.fileUploadSpinner = false; console.log(data)},
                error => console.log(error)
            )
    }
}

  uploadPicture() {
      
  }

}
