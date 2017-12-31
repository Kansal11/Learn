import { Injectable } from '@angular/core';

const securityList: Array<Object> = require('./../assets/security.json');

@Injectable()
export class CommonService {
    private isSorted:boolean = false;

    private sortList = function() {
        this.isSorted = true;
        securityList.sort( function(a,b) {            
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

    findInStockDescription(description:string) {       
        if(!this.isSorted) {
            this.sortList();
        }
        this.searchStockList(securityList.slice(), description);
    }
    
    searchStockList = function(copyOfSecurityList:any, description:string) {
        var mid = Math.floor(copyOfSecurityList.length / 2);
        if (copyOfSecurityList[mid].Description.slice(0,description.length).toString() === description) {
            this.searchResults.push(copyOfSecurityList[mid]);
            this.searchBefore(copyOfSecurityList.slice(0,mid), description);
            this.searchAfter(copyOfSecurityList.slice(mid+1), description);
            return copyOfSecurityList[mid];
        } else if (copyOfSecurityList[mid].Description.slice(0,description.length).toString() < description && copyOfSecurityList.length > 1) {
            this.searchStockList(copyOfSecurityList.splice(mid+1), description);
        } else if (copyOfSecurityList[mid].Description.slice(0,description.length).toString() > description && copyOfSecurityList.length > 1) {
            this.searchStockList(copyOfSecurityList.splice(0,mid), description);
        } else {
            console.log('not found');
            return -1;
        }
    }

    searchBefore(list, searchTerm) {
        for(let i=list.length-1; i>=0; i--) {
            if(list[i].Description.slice(0,searchTerm.length).toString() === searchTerm) {
                this.searchResults.push(list[i]);
            }
            else {
                break;
            }
        }
    }

    searchAfter(list, searchTerm) {
        for(let i=0; i<list.length; i++) {
            if(list[i].Description.slice(0,searchTerm.length).toString() === searchTerm) {
                this.searchResults.push(list[i]);
            }
            else {
                break;
            }
        }
    }
}