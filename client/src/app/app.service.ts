import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Garden } from './app';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getGardens(date: string): Observable<Array<Garden>> {
    const logs: Array<Garden> = [
      { _id: '1', date: '8:00 AM', temperature: 3.4564523, humidity: 1.123123, moisture: 5.234, light: 2.2341 },
      { _id: '2', date: '9:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '3', date: '10:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '4', date: '11:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '5', date: '12:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '6', date: '1:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '7', date: '2:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '8', date: '3:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '9', date: '4:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '10', date: '5:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '11', date: '6:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '12', date: '7:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { _id: '13', date: '8:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 }
    ]
    return Observable.of(logs);
  }

  postGarden(garden: Garden): Observable<Garden> {
    return Observable.of(garden);
  }

  deleteGarden(gardenId: string): Observable<boolean> {
    return Observable.of(true);
  }

}
