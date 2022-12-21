import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '@app/core/services/loader.service';
import { Subscription } from 'rxjs';
import { getLoaderStateSelector, ILookupState } from '@app/shared/stores';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading = true;
  loaderSubscription$: Subscription = new Subscription();

  constructor(
    public loaderService: LoaderService,
     private cdr: ChangeDetectorRef,
     private lookupStore: Store<ILookupState>,
     ) { }

  ngOnInit() {
    this.isLoading = false;

    this.loaderSubscription$ = this.lookupStore.pipe(select(getLoaderStateSelector)).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading ? true : false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.loaderSubscription$) {
      this.loaderSubscription$.unsubscribe();
    }
  }
}
