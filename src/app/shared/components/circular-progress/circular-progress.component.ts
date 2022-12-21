import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss']
})
export class CircularProgressComponent implements OnInit {
  @Input() percentage: number;
  @Input() isResponsive: boolean;
  textPercentage: string;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    this.textPercentage = `${this.percentage}`;
  }

}
