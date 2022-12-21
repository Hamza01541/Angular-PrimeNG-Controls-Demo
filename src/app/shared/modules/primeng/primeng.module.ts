import { NgModule } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { OrderListModule } from 'primeng/orderlist';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService,ConfirmationService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { DialogService, DynamicDialogModule,  } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';

const modules = [
  ButtonModule,
  TableModule,
  DividerModule,
  CardModule,
  InputTextModule,
  TabViewModule,
  CheckboxModule,
  OrderListModule,
  PasswordModule,
  ToastModule,
  DynamicDialogModule,
  ProgressSpinnerModule,
  DialogModule,
  ToolbarModule,
  SplitButtonModule,
  MenuModule,
  DropdownModule,
  ProgressBarModule,
  TooltipModule,
  MultiSelectModule,
  CalendarModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [MessageService, DialogService,ConfirmationService],
})
export class PrimengModule { }
