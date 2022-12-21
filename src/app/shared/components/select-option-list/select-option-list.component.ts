import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '@app/core/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'select-option-list',
  templateUrl: './select-option-list.component.html',
  styleUrls: ['./select-option-list.component.scss']
})
export class SelectOptionListComponent implements OnInit {
  keyword: string = '';
  @Input() type: any;
  @Input() options: Array<any>;
  @Input() isShowChips: any;
  @Input() disableMultiSelect: boolean = false;
  selectedOptions: Array<any>;
  defaultOptions: Array<[]>;
  @Output() onSelectedOptions = new EventEmitter<Array<any>>();
  constructor( private helperService: HelperService,
    private messageService: MessageService ) { }

  ngOnChanges() {
    this.options.forEach(option => option.isSelected = false)
    this.defaultOptions = this.options;
    this.selectedOptions = [];
  }

  ngOnInit(): void {
    this.selectedOptions = [];
  }

  /**
   * Searches by name from the options for the given keyword.
   * @param keyword 
   */
  onSearchEvent(keyword: any) {
    if (keyword.length >= 1) {
      this.options = this.defaultOptions;
      this.options = this.options.filter(option => option.name.toLowerCase().includes(keyword.toLowerCase()));
    } else {
      this.options = this.defaultOptions;
    }
  }

  /**
   * Clears the search result.
   */
  onClearSearchEvent() {
    this.selectedOptions = [];
  }

  /**
   * Adds the selected option
   * @param index 
   * @param option 
   */
  onSelect(index: any, option: any) {
    option.isSelected = true;
    // this.options = this.helperService.sortByKey(this.options, 'isSelected', 'DESC')
    if (this.disableMultiSelect) {
      // de-select the previously selected options.
      this.options.forEach(opt => { if (option.name !== opt.name) { delete opt.isSelected } });
      this.selectedOptions = [option];
      this.onSelectedOptions.emit(this.selectedOptions);
    } else {
      /**
       * This invokes specially for employee range filter (For Now).
       * Where we need to maintain contiguous & continue range selection.
       */
      if (option.order && (this.type == 'Employee Range' ||  this.type == 'Revenue Range')) {
        this.handleContinuesOrderSelection(option, index);
      } else {
        this.pushOption(option);
      }
    }
  }

  /**
   * Removes the selected options.
   * @param index 
   * @param option 
   */
  onDeselect(index: any, option: any) {
    option.isSelected = false;
    // this.options = this.helperService.sortByKey(this.options, 'isSelected', 'DESC')
    this.selectedOptions = this.helperService.deleteElement(this.selectedOptions, option);
    if(this.selectedOptions && this.selectedOptions.length) {
      this.selectedOptions = this.helperService.removeDuplicate(this.selectedOptions);
    }
    this.onSelectedOptions.emit(this.selectedOptions);
  }

  /**
   *  This Maintains the contiguous & continue range selection.
   * @param option 
   * @param index 
   */
  handleContinuesOrderSelection(option: any, index: any) {
    if (this.selectedOptions.length) {
      let maxIndex = this.selectedOptions.length - 1;
      let topElementOrder = this.selectedOptions[maxIndex].order;
      let currentElementOrder = option.order;
      let isAllow = (currentElementOrder + 1 == topElementOrder) || (currentElementOrder - 1) === topElementOrder;
      if (isAllow) {
        this.pushOption(option);
      } else {
        this.options[index].isSelected = false;
        this.messageService.add({
          severity: 'error',
          detail: 'Please select a continuous range!',
        });
      }
    } else {
      this.pushOption(option);
    }
  }

  /**
   * Emits the selected criteria
   * @param option 
   */
  pushOption(option: any) {
    this.selectedOptions.push(option);
    this.onSelectedOptions.emit(this.selectedOptions);
  }
}
