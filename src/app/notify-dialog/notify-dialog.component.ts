import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent implements OnInit {

	title : string;
	message : string;
  constructor(private dialog : MdDialogRef<NotifyDialogComponent>) { }

  ngOnInit() {
  	this.title = this.dialog.config.data.title;
  	this.message = this.dialog.config.data.message;
  }

}
