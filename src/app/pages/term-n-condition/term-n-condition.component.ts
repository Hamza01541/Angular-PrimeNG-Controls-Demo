import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-term-n-condition',
  templateUrl: './term-n-condition.component.html',
  styleUrls: ['./term-n-condition.component.scss']
})
export class TermNConditionComponent implements OnInit {

  constructor(public dialogRef: DynamicDialogRef) { }

  ngOnInit(): void {}

  /**
   * Accepts terms and conditions
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
