import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './details.component.html'
  })
  export class DetailsComponent implements OnInit {
    constructor(private route: ActivatedRoute) {

    }

    item:any;
    sub: Subscription;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
           this.item = params; 
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

  }