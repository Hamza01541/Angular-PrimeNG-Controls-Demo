import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApplicationUseCases } from '@app/shared/models';

@Component({
  selector: 'app-add-usecase-card',
  templateUrl: './add-usecase-card.component.html',
  styleUrls: ['./add-usecase-card.component.scss'],
})
export class AddUsecaseCardComponent implements OnInit {

  @Input() cardIndex: number;
  @Input() useCaseList: ApplicationUseCases[];
  @Input() set hideTab(value: boolean) {
    if (value) {
      this.isAdded = value;
    }
  }
  @Output() createNewCard = new EventEmitter<any>();
  @Output() deleteCard = new EventEmitter<any>();

  isAdded: boolean;
  selectedUseCase: number;

  constructor() { }

  ngOnInit(): void {}

  /**
   * add use case
   */
  addedUseCase() {
    this.isAdded = !this.isAdded;
  }

  /**
   * selects Use Case from dropdown
   */
  selectUseCase() {
    this.createNewCard.emit({ selectedCardIndex: this.cardIndex, selectedUseCase: this.selectedUseCase });
    this.isAdded = false;
  }

  /**
   * remove Card
   */
  removeCard() {
    this.deleteCard.emit(this.cardIndex)
  }
}
