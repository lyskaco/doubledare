import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable()
export class PreventNotLoggedInAccessService {
canAccess
  constructor(private authService: Auth, private route : ActivatedRoute, private router : Router) { }

 	canActivate() : boolean {
  	this.authService.isLogged$.subscribe(res => this.canAccess = res)
  	if(!this.canAccess) {
  		this.router.navigateByUrl('')
  	} 
    return !!this.canAccess;
  }
}

