import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { Router, ActivatedRoute} from '@angular/router';

export interface RegisterForm {
	userName : string;
	firstName : string;
	lastName : string;
	email : string;
	password : string;
}

export interface APIResponse {
	result : string;
	message : string;
	userData : any;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	formRegister : RegisterForm = {
		userName : '',
		firstName : '',
		lastName : '',
		email: '',
		password : ''
	}

  isBetaEnabled : boolean = true; // DISABLE WHEN BETA STOPS
  eventToken;
	registerResponse : APIResponse;
  iAmThinking : boolean = false;
  constructor(private authService : Auth, private route : ActivatedRoute, private router : Router) { }


   ngOnInit() {
    this.getRoute().then(res => {
      this.eventToken = res;
      this.isTokenValid(this.eventToken);
    })
  }

  getRoute() {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(res=> {
        resolve(res)
      })
    })
  }
   isTokenValid(param) {
    let token = param.token;
    this.authService.isTokenValid(token).subscribe(res => {
      if(res.result.toLowerCase() === "success") { 
        
    } else {
        alert('Invitation token not authorized!');
        this.router.navigateByUrl('/');
        
    }
    });
  }

  fbLogin () {
    this.iAmThinking = true;
    this.authService.loginFb().then(resp => {
          this.authService.gatherFbInfo().then(res => {
            this.authService.setUserObject(res);
            this.authService.changeLoginStatus(true);
            this.authService.registerUser(res).subscribe(res => res);
            this.iAmThinking = false; 
          });
      

    })
  }

  register() {
  	let registerData = JSON.parse(JSON.stringify(this.formRegister));
    if(this.isBetaEnabled) {
        registerData.betaToken = this.eventToken.token;
        this.authService.betaRegister(registerData).subscribe(res => 
      {  
        this.registerResponse = res;
        if(this.registerResponse.result === 'success') {
          console.log(this.registerResponse);
          this.authService.changeLoginStatus(true);
          this.authService.setUserObject(registerData);
        } 
      }
    );
    } else {
  	this.authService.regularRegister(registerData).subscribe(res => 
  		{	
  			this.registerResponse = res;
  			if(this.registerResponse.result === 'success') {
  				console.log(this.registerResponse);
  				this.authService.changeLoginStatus(true);
  				this.authService.setUserObject(registerData);
  			} 
  		}
  	); 
  }
}
}
