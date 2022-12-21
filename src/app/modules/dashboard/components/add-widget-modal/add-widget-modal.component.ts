import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-widget-modal',
  templateUrl: './add-widget-modal.component.html',
  styleUrls: ['./add-widget-modal.component.scss']
})
export class AddWidgetModalComponent implements OnInit {

  constructor(public dialogRef: DynamicDialogRef) {}

  ngOnInit(): void {}

  /**
   * accept
   */
  accept() {
    this.dialogRef?.close(true);
  }

  /**
   * Declines terms and conditions
   */
  decline() {
    this.dialogRef?.close(false);
  }
}
