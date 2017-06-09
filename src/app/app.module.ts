import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {MaterialModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {CalendarModule} from 'primeng/primeng';
import 'hammerjs';

// packages ^

import { Auth } from './auth.service'
import { SharedService } from './shared.service'
import { PreventLoggedInAccessService } from './prevent-logged-in-access.service'
import { PreventNotLoggedInAccessService } from './prevent-not-logged-in-access.service';
import { FacebookService } from 'ng2-facebook-sdk';
import { DialogServiceService } from './dialog-service.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
//services ^

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './content/content.component';
import { CRoomComponent } from './c-room/c-room.component';
import { OrderByDatePipe } from './order-by-date.pipe';
import { EventsFilterPipePipe } from './events-filter-pipe.pipe';
import { onlyOpenPipePipe } from './events-filter-pipe.pipe';
import { SingleRoomComponent } from './single-room/single-room.component';
import { EventsGeneralComponent } from './events-general/events-general.component';
import { DialogUsernameComponent } from './dialog-username/dialog-username.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NotifyDialogComponent } from './notify-dialog/notify-dialog.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';


//components ^

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.6, threshold: 20} // override default settings
  }
}
const appRoutes: Routes = [
{ path: 'login', component: LoginComponent, canActivate: [PreventLoggedInAccessService] },
{ path: 'register/:token', component: RegisterComponent, canActivate: [PreventLoggedInAccessService] },
{ path: 'dashboard', component: DashboardComponent, canActivate: [PreventNotLoggedInAccessService] },
{ path: 'create-event', component: CRoomComponent, canActivate: [PreventNotLoggedInAccessService] },
{ path: 'event-general', component: EventsGeneralComponent, canActivate: [PreventNotLoggedInAccessService] },
{ path: 'room/:id', component: SingleRoomComponent, canActivate: [PreventNotLoggedInAccessService]},
{ path: 'how-it-works', component: HowItWorksComponent},
{ path: '', component: HomeComponent },
{ path: '**', redirectTo: '' }
]
let providers = {
    "facebook": {
      "clientId": "1206693522785012",
      "apiVersion": "v2.8" //like v2.4 
    }
  };
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardNavbarComponent,
    DashboardComponent,
    ContentComponent,
    CRoomComponent,
    OrderByDatePipe,
    EventsFilterPipePipe,
    onlyOpenPipePipe,
    SingleRoomComponent,
    EventsGeneralComponent,
    DialogUsernameComponent,
    ConfirmationDialogComponent,
    NotifyDialogComponent,
    HowItWorksComponent,
    FeedbackDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  entryComponents: [DialogUsernameComponent, ConfirmationDialogComponent, NotifyDialogComponent, FeedbackDialogComponent],
  providers: [CookieService, FacebookService,Auth, PreventLoggedInAccessService, PreventNotLoggedInAccessService, { 
                    provide: HAMMER_GESTURE_CONFIG, 
                    useClass: MyHammerConfig 
                }, SharedService, {provide: LocationStrategy, useClass: HashLocationStrategy}, DialogServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
