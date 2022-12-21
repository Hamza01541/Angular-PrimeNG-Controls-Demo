import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmationt-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  imageTitle: string;
  contentTitle: string;
  contentDescription: string;

  constructor(public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.imageTitle = this.config.data.imageTitle;
    this.contentTitle = this.config.data.contentTitle;
    this.contentDescription = this.config.data.contentDescription;
  }

  ngOnInit(): void { }


  /**
 * closes confimation model && return true
 */
  accept() {
    this.dialogRef?.close(true);
  }

  /**
   * closes confimation model && return false
   */
  decline() {
    this.dialogRef?.close(false);
  }
}
