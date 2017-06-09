import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
export interface FormLogin {
	email : string;
	password : string;
}
export interface APIResponse {
  result : string;
  message : string;
  userData : any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

	formLogin : FormLogin = {
		email : '',
		password : ''
	};

  loginResponse : APIResponse;
  iAmThinking : boolean = false;
  isLoggedAnimation = false;
  constructor( private authService : Auth) { 

  }

  ngOnInit() {
  }

  fbLogin () {
  	// this.iAmThinking = true;
  	this.authService.loginFb().then(resp => {
            this.authService.gatherFbInfo().then(res => {
            this.authService.setUserObject(res);
            this.authService.changeLoginStatus(true);
            this.authService.registerUser(res).subscribe(res => res);
            this.iAmThinking = false; 
          });
      

    }
    );
    // .subscribe(res => console.log(res))

  }


  login() {
    this.iAmThinking = true;
    let loginData = JSON.parse(JSON.stringify(this.formLogin));
    this.authService.regularLogin(loginData).subscribe(res => {
      this.loginResponse = res;
      this.iAmThinking = false; 
      if(this.loginResponse.result === 'success') {
        this.authService.changeLoginStatus('true');
        this.authService.setUserObject(this.loginResponse.userData);
       
      }
    })

  }

}
