import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { extractData, handleError } from './app.utilities';

import { Garden } from './app';

@Injectable()
export class AppService {

  constructor(public http: Http) { }

  getGardens(date: string): Observable<Array<Garden>> {
    return this.http
      .get('/api/gardens', { params: { date } })
      .map(extractData)
      .catch(handleError);
  }

  deleteGarden(id: string): Observable<boolean> {
    return this.http
      .post('/api/gardens/delete', { id })
      .map(extractData)
      .catch(handleError);
  }

}
