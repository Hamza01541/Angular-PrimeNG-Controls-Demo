import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-introdution-video-modal',
  templateUrl: './introdution-video-modal.component.html',
  styleUrls: ['./introdution-video-modal.component.scss']
})

export class IntrodutionVideoModalComponent implements OnInit {

  title: string;
  description: string;
 
  constructor( public config: DynamicDialogConfig, public dialogRef: DynamicDialogRef ) {
    this.title = this.config.data.title;
    this.description = this.config.data.description;
   }

  ngOnInit(): void {
  }

 /**
  * dismiss IntrodutionVideo Modal popup.
  */ 
  closePopup() {
    this.dialogRef?.close(true);
  }
}
