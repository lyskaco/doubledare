import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Auth } from '../auth.service';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	isLogged
  allowedPaths = ['/', '/login', '/register', '/how-it-works'];
  currentPath 
  constructor(private router : Router, private authService : Auth ) {
  }

  logOut() {
  	this.authService.changeLoginStatus('false');
  	// this.isLogged = Observable.of(false);
  }
  ngOnInit() {
  	this.authService.isLogged$.subscribe(res => this.isLogged = res)
  	this.router.events.subscribe(res=> this.currentPath = res.url);
  }

  isOnAllowedPath() {
    if(this.allowedPaths.indexOf(this.currentPath) === -1) {
      return true;
    } else return false;
  }
}
