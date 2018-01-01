import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CommonService{
    private isSorted:boolean = false;
    private securityList: any;

    constructor(private http:Http) {
        this.http.get('./../assets/security.json')
            .subscribe(res => {
                this.securityList = res.json();
            });
    }
 
    private sortList = function() {
        this.securityList.sort( function(a,b) {            
            if(a.Description < b.Description) {
                return -1;
            }
            if(a.Description > b.Description){
                return 1;
            }
            return 0;
        })
    }

    public searchResults = [];

    findInStockDescription = function(description:string) {       
        if(!this.isSorted) {  
            this.sortList();
            this.isSorted = true;
            console.log(this.securityList);
        }
        this.searchResults = [];
        return this.searchStockList(this.securityList.slice(), description.toUpperCase());                
    }
    
    searchStockList = function(copyOfSecurityList:any, description:string) {
        var mid = Math.floor(copyOfSecurityList.length / 2);
        if (copyOfSecurityList.length>0 && copyOfSecurityList[mid].Description.toUpperCase().slice(0,description.length) === description) {
            this.searchResults.push(copyOfSecurityList[mid]);
            this.searchBefore(copyOfSecurityList.slice(0,mid), description);
            this.searchAfter(copyOfSecurityList.slice(mid+1), description);
            // return this.searchResults;
        } else if (copyOfSecurityList.length>0 && copyOfSecurityList[mid].Description.toUpperCase().slice(0,description.length) < description && copyOfSecurityList.length > 1) {
            this.searchStockList(copyOfSecurityList.splice(mid+1), description);
        } else if (copyOfSecurityList.length>0 && copyOfSecurityList[mid].Description.toUpperCase().slice(0,description.length) > description && copyOfSecurityList.length > 1) {
            this.searchStockList(copyOfSecurityList.splice(0,mid), description);
        } else {
            console.log('not found');
            // return [];
        }
        return Observable.of(this.searchResults);
    }

    searchBefore(list, searchTerm) {
        for(let i=list.length-1; i>=0; i--) {
            if(list[i].Description.slice(0,searchTerm.length).toUpperCase().toString() === searchTerm) {
                this.searchResults.push(list[i]);
            }
            else {
                break;
            }
        }
    }

    searchAfter(list, searchTerm) {
        for(let i=0; i<list.length; i++) {
            if(list[i].Description.slice(0,searchTerm.length).toUpperCase().toString() === searchTerm) {
                this.searchResults.push(list[i]);
            }
            else {
                break;
            }
        }
    }
}