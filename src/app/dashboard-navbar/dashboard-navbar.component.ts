import { Component, OnInit,  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { Observable ,BehaviorSubject } from 'rxjs/Rx';
 import {Router, ActivatedRoute } from '@angular/router';
 import {SharedService} from '../shared.service';
 import { Auth } from '../auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss'],
   animations: [
    trigger('sideBar', [
      state('inactive', style({
        opacity : 0,
        transform: 'translateX(-80%)'
      })),
      state('active',   style({
        opacity : 1,
        transform: 'translateX(0)'
      })),
      transition('* => active', animate('400ms ease-in')),
      transition('* => inactive', animate('200ms ease-out'))
    ])
  ]
})


export class DashboardNavbarComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isSwiped : boolean = false;
  currentRoutePath : string;
  notAllowedRoutes = ['/', '/login', '/register', '/how-it-works'];
  sideBarState = 'inactive';
  constructor(private route : ActivatedRoute, private router:Router, private ss : SharedService, private authService : Auth) {
   }

  ngOnInit() {
  	this.router.events.subscribe(result => this.currentRoutePath = result.url);
 
  }

 logout() {
     this.authService.changeLoginStatus('false');
 }
 swipe(direction) {
 	let deviceWidth = window.screen.width;
 	if (deviceWidth < 768 && this.notAllowedRoutes.indexOf(this.currentRoutePath) < 0) // change this
 	{
 		if(direction === 'right') {
 	 		this.sideBarState = 'active';
      this.ss.isSideNavOpenFunc(true);
 	 	} else if(direction === 'left') {
 	 		this.sideBarState = 'inactive';
      this.ss.isSideNavOpenFunc(false);
 	 	}
 	 }
 	}
}
