import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-criteria-widget-card',
  templateUrl: './criteria-widget-card.component.html',
  styleUrls: ['./criteria-widget-card.component.scss'],
})
export class CriteriaWidgetCardComponent implements OnInit {
  @Input() item: any;
  
  constructor() {}

  ngOnInit(): void {
   
  }
}
