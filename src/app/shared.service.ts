import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable ,BehaviorSubject } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class SharedService {
isSideNavOpen = {asd: 'asd'};
isSideNavOpenFunc(bool) 
 {
 	this.isSideNavOpen = bool;
 }

swipeRouter(where : string) {
	console.log(where);
	this.router.navigateByUrl(where);
}
redirectMeAnywhere(param : string) {
	this.router.navigateByUrl(param);
}
deleteEvent(id, desc) : Observable<any> {

	let data = {
		rejectDescription : desc,
		id : id
	}
	
	return this.http.post('//serwer1763147.home.pl/bettingApp/api/rejectevent', JSON.stringify(data)) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}
getAllEvents() : Observable<any> {

	return this.http.get('//serwer1763147.home.pl/bettingApp/api/getEvents') // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}
getEventsUserInvolved(param) : Observable<any> {
	
	let data = {
		id : param
	}

	return this.http.post('//serwer1763147.home.pl/bettingApp/api/getEventParticipant', JSON.stringify(data)) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}

getEventsUserCreated(param) : Observable<any> {
	let data = {
		id : param
	}

	return this.http.post('//serwer1763147.home.pl/bettingApp/api/getEventUser', JSON.stringify(data)) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());

}
getEventsUserParticipates(param) : Observable<any> {
	let data = {
		id : param
	}

	return this.http.post('//serwer1763147.home.pl/bettingApp/api/getEventParticipant', JSON.stringify(data)) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());

}
submitEvent(data) : Observable<any> {
	return this.http.post('//serwer1763147.home.pl/bettingApp/api/addEvent', data) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}

getSingleEventDetails(id) : Observable<any> {

	return this.http.post('//serwer1763147.home.pl/bettingApp/api/getSingleRoomDetails', {token : id}) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());

} 
hostDecideSide(idRoom, side, allPoints, participantsNumberNegative, participantsNumberPositive) : Observable<any> {

	let data = {
		idRoom : idRoom,
		side : side,
		allPoints : allPoints,
		participantsNumberNegative : participantsNumberNegative,
		participantsNumberPositive : participantsNumberPositive
	}

	return this.http.post('//serwer1763147.home.pl/bettingApp/api/winner', data) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error.json());
}
joinEvent(idParticipant, idRoom, side, roomPoint) : Observable<any> {
	let data = {
		idRoom: idRoom,
		idParticipant: idParticipant,
		side: side,
		roomPoint: roomPoint

	}
	
	return this.http.post('//serwer1763147.home.pl/bettingApp/api/addParticipant', data) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error);
}

sendFeedbackForm(data) : Observable<any> {
	
	return this.http.post('//serwer1763147.home.pl/bettingApp/api/sendFeedback', JSON.stringify(data)) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => error);
}

  constructor(private http : Http, private router : Router) { }


}
