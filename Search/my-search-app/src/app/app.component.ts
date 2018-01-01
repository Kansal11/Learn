import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from './shared/commonService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  searchItems: any[];
  searchText: string;
  getResults: Subscription;
  detailsShown: boolean;

  constructor(private commonService:CommonService, private router: Router) {

  }

  ngOnInit() {
    this.detailsShown = false;
  }

  ngAfterViewInit() {
    var input: any = document.getElementById('search');
    var self = this;
    const search = Observable.fromEvent(input, 'keyup').debounceTime(500)
        .do(() => {
            if (input.value == '') {
                this.searchItems = null;
            } else {

            }
        })
        .switchMap(function() {
            return self.commonService.findInStockDescription(input.value);
        });

    this.getResults = search.subscribe(
        (response: any) => {
            if (response) {
                if (this.searchText) {
                    this.searchItems = response;
                } else {
                    this.searchItems = null;
                }
            } else {

            }
        }
    );
  }

  showDetails = function(item) {
      this.router.navigate(['/details',{'SecType':item.SecType,'Ticker':item.Ticker,'Cusip':item.Cusip,'Description':item.Description}]);
      this.detailsShown = true;
  }

  ngOnDestroy() {
    this.getResults.unsubscribe();
  }
}
