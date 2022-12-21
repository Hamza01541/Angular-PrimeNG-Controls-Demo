import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IntrodutionVideoModalComponent } from '@app/modules/dashboard/components';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-quick-start-sidemenu',
  templateUrl: './quick-start-sidemenu.component.html',
  styleUrls: ['./quick-start-sidemenu.component.scss']
})
export class QuickStartSidemenuComponent implements OnInit {
  @Output() hideQucikStartMenu = new EventEmitter()

  sidebar: boolean = true;
  selectedTitle: string;
  isShowContent: boolean = true;
  isImage: boolean = false;
  progressBar: number = 0;
  dialogRef: DynamicDialogRef;
  quickStartList = [
    {
      icon: 'database',
      active_icon: 'database-active',
      title: 'Search & Verify DealSignal Database',
      credits: 25,
      videoUrl: 'https://www.youtube.com/',
      isCompleted: true,
      approved: 'approved'
    },
    {
      icon: 'verify-badge',
      active_icon: 'verify-active',
      title: 'Import & Verify Existing Lists',
      credits: 25,
      videoUrl: 'https://www.youtube.com/',
      isCompleted: true,
      approved: 'approved'
    },
    {
      icon: 'chrome-extension',
      active_icon: 'chrome-active',
      title: 'Download the Chrome Extension',
      credits: 25,
      videoUrl: 'https://www.youtube.com/',
      isCompleted: false,
      approved: 'approved'
    },
    {
      icon: 'upload-badge',
      active_icon: 'crm-active',
      title: 'Upload, Enrich & Verify existing Lists from CSV/CRM',
      credits: 25,
      videoUrl: 'https://www.youtube.com/',
      isCompleted: true,
      approved: 'approved'
    },
    {
      icon: 'content-badge',
      active_icon: 'conector-active',
      title: 'Connect to CRM',
      credits: 25,
      videoUrl: 'https://www.youtube.com/',
      isCompleted: false,
      approved: 'approved'
    },
  ]

constructor(
    public dialogService: DialogService,) { }

  ngOnInit(): void {
    this.getProgress();
  }

  /**
   * hides QuickStart SideMenu.
   */
  hideQuickStartSideMenu() {
    this.hideQucikStartMenu.emit(false);
  }
  /**
   * show content on click
   * @param quickStart
   */
  showSelectTitleItem(quickStart) {
    this.isShowContent = true;
    this.selectedTitle = quickStart.title;
  }

  /**
   * get total progress
   */
  getProgress() {
    const totalValue = 100;
    const divder = totalValue / this.quickStartList.length;
    this.quickStartList.forEach(item => {
      if (item.isCompleted) {
        this.progressBar = this.progressBar + divder;
      }
    });
  }

  /**
  * close content
  */
  hideSelectTitleItem() {
    this.isShowContent = false;
  }

  /**
   * Gets image path from image name
   * @param imageName Image name
   * @returns
   */
  getImage(imageName: string) {
    return `assets/icons/${imageName}.svg`;
  }

  /**
  * opens Introduction video Modal popup.
  */
  openVideoModalPopup() {
    this.dialogRef = this.dialogService.open(IntrodutionVideoModalComponent, {
      data: {
        title: this.selectedTitle,
        description: this.selectedTitle
      },
      width: '75%',
      contentStyle: { "padding": "0", "overflow": "hidden", },
      closeOnEscape: true,
      showHeader: false
    });

    this.dialogRef.onClose.subscribe((data) => {
    });
  }
}
