import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable , BehaviorSubject } from 'rxjs/Rx';
import {FacebookService, FacebookInitParams} from 'ng2-facebook-sdk';
import {CookieService} from 'angular2-cookie/core';
import { Subject }    from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare const FB : any;
@Injectable()
export class Auth {

  // private isLogged = new BehaviorSubject(JSON.parse(sessionStorage.getItem('isLogged')));
  // private user = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')));
  private isLogged = new BehaviorSubject(this._cookie.get('isLogged'));
  private user = new BehaviorSubject(this._cookie.getObject('user'));
  isLogged$ = this.isLogged.asObservable();
  user$ = this.user.asObservable();
  userAgent = navigator.userAgent;


  constructor (private _cookie : CookieService, private http: Http, private router : Router, private fb: FacebookService) {
    this.isLogged$.subscribe(res=> console.log(res))
  }

  changeLoginStatus (logged) {
      
      if(logged === 'true') {
          this._cookie.put('isLogged', logged)
          this.router.navigateByUrl('dashboard')
          this.isLogged.next(logged);
      } else if(logged === 'false') {
          this.isLogged.next(null);
          this.router.navigateByUrl('')
          this._cookie.remove('user');
          this._cookie.remove('isLogged');
      }
      // this._cookie.remove('user');
      //sessionStorage.setItem('isLogged', JSON.stringify(logged));  
  } 
  


  setUserObject (user: any) {
      console.log(user);
      //sessionStorage.setItem('user', JSON.stringify(user)); 
      this._cookie.putObject('user', user)
      this.user.next(user); 
  } 
  
  

  loginFb() {

    return new Promise(function (resolve, reject) {
     FB.login((response) => {

        if(response.status === 'connected') {
           // this.changeLoginStatus(true);
           resolve(response);
           }
        if(!response) {
          reject();
        }
      }, { scope: 'email, public_profile' })
})
}

    //   FB.getLoginStatus(response => {
    //     this.statusChangeCallback(response);
    // });
          
isTokenValid(param) : Observable<any> {

  let data = {
    betaToken: param
  }
     return this.http.post('//serwer1763147.home.pl/bettingApp/api/tokenCheck', data ) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}
gatherFbInfo() {

 return new Promise(function (resolve, reject) {
          FB.api('/me?fields=id,name,first_name, last_name, email, picture.width(300).height(300)',
            (result) => {
                if (result && !result.error) {
                    // this.setUserObject(result);
                    // this.registerUser(result).subscribe(res => console.log(res));               
                     resolve(result)
                } else {
                    reject();
                }
            });
})
     }

registerUser(params) : Observable<any>{
     
  
  let data = {
      email : params.email,
      firstName : params.first_name,
      lastName : params.last_name,
      picture : params.picture.data.url,
      id : params.id
    }

    return this.http.post('//serwer1763147.home.pl/bettingApp/api/login/facebook', data) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}



betaRegister(data) : Observable<any> {

  let registerData = data;
  return this.http.post('//serwer1763147.home.pl/bettingApp/api/registerBeta', registerData) // ...using post request
                     .map((res:Response) => { return res.json()}) // ...and calling .json() on the response to return data
                     .catch((error:any) => error.json());



}

regularRegister(data) : Observable<any> {
  let registerData = data;

  return this.http.post('//serwer1763147.home.pl/bettingApp/api/register', registerData) // ...using post request
                     .map((res:Response) => { return res.json()}) // ...and calling .json() on the response to return data
                     .catch((error:any) => error.json());



}

regularLogin(data) : Observable<any> {
  let loginData = data;

  return this.http.post('//serwer1763147.home.pl/bettingApp/api/login', loginData) // ...using post request
                     .map((res:Response) =>  { return res.json()}) // ...and calling .json() on the response to return data
                     .catch((error:any) => error.json());



}

getUserData(param) : Observable<any> {
  let userAccessParam = {
    email : param
  };
  return this.http.post('//serwer1763147.home.pl/bettingApp/api/user', userAccessParam) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => error.json());

   }

   updateUserName(username, id) : Observable<any> {
     let data = {
       id : id,
       userName : username
     }
     console.log(data);
     return this.http.post('//serwer1763147.home.pl/bettingApp/api/updateUsername', data) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => error.json());
   }
 }