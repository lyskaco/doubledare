import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import {Auth} from '../auth.service';
@Component({
  selector: 'app-dialog-username',
  templateUrl: './dialog-username.component.html',
  styleUrls: ['./dialog-username.component.scss']
})
export class DialogUsernameComponent implements OnInit {
  idUser : string;
  message: string;
  constructor(public dialogRef: MdDialogRef<DialogUsernameComponent>, private authService : Auth) { }

  ngOnInit() {
  	this.idUser = this.dialogRef.config.data.id;
  }
  // updateUserName(userName, isValid) {
  // 	function userNameValidate(param) {
  // 		let username = param.userName;
  // 		if(username.indexOf(' ')>=0){
  // 			this.message = 'Illegal characters';
  // 			return false;
  // 		} else { 
  // 			return true;
  // 		}
  // 	}
 updateUserName(userName, isValid) {
  	// if(userNameValidate.call(this, userName)) {
  		this.authService.updateUserName(userName.userName, this.idUser).subscribe(res=> this.message = res.message);
  	// }
  }
}
