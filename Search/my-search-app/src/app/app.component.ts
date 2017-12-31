import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from './shared/commonService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  searchItems: any[];
  searchText: string;
  getResults: Subscription;

  constructor(private commonService:CommonService) {

  }

  ngAfterViewInit() {
    var input: any = document.getElementById('search');
    const search = Observable.fromEvent(input, 'keyup').debounceTime(500)
        .do(() => {
            if (input.value == '') {
                this.searchItems = null;
            } else {

            }
        })
        .switchMap(() =>
            this.commonService.findInStockDescription(input.value)
        );

    this.getResults = search.subscribe(
        (response: any) => {
            if (response) {
                if (this.searchText != null && this.searchText != undefined && this.searchText != '') {
                    this.searchItems = response.items;
                } else {
                    this.searchItems = null;
                }
            } else {

            }
        }
    );
  }

  ngOnDestroy() {
    this.getResults.unsubscribe();
  }
}
