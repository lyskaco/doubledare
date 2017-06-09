import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
title : string;
message : string;
  constructor(private dialog : MdDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit() {
  	this.title = this.dialog.config.data.title;
  	this.message = this.dialog.config.data.message;
  }

}
