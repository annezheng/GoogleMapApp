import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  apiRoot:string = 'https://maps.googleapis.com/maps/api/geocode/json';
  key: string = "AIzaSyCKmCluq7sA4U5bIXOhsxPZhGk1SrmEiJk";

  constructor(private http: Http) { };
  
  getLocation(location){
    let apiURL = `${this.apiRoot}?address=${location}&key=${this.key}`;
      return this.http.get(apiURL)
          .map(res => res.json());
  }

}
