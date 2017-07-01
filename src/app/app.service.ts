import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { GardenLog } from './app';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getLogs(date: string): Observable<Array<GardenLog>> {
    const logs: Array<GardenLog> = [
      { date: '8:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '9:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '10:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '11:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '12:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '1:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '2:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '3:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '4:00 AM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '5:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '6:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '7:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 },
      { date: '8:00 PM', temperature: 3, humidity: 1, moisture: 5, light: 2 }
    ]
    return Observable.of(logs);
  }

}
