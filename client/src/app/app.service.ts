import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { extractData, handleError } from './app.utilities';

//import { Garden } from './app';

export class Garden {
  _id?: string;
  date: string;
  temperature: number;
  humidity: number;
  moisture: number;
  light: number;
}

@Injectable()
export class AppService {

  constructor(public http: Http) { }

  /**
   * Get gardens
   * @param {string} date ISO formatted date string
   * @returns {Array<Garden>}
   */
  getGardens(date: string): Observable<Array<Garden>> {
    return this.http
      .get('/api/gardens', { params: { date } })
      .map(extractData)
      .catch(handleError);
  }

  /**
   * Update garden
   * @param {Garden} garden
   * @returns {number} Amount of gardens updated
   */
  putGarden(garden: Garden): Observable<number> {
    return this.http
      .put('/api/gardens', { garden })
      .map(extractData)
      .catch(handleError);
  }

  /**
   * Insert gardens
   * @param {Array<Garden>} gardens
   * @returns {Array<Garden>}
   */
  postGardens(gardens: Array<Garden>): Observable<Array<Garden>> {
    return this.http
      .post('/api/gardens', { gardens })
      .map(extractData)
      .catch(handleError);
  }

  /**
   * Delete gardens
   * @param {Array<string>} ids of the garden
   * @returns {number} Count of deleted gardens
   */
  deleteGardens(ids: Array<string>): Observable<number> {
    return this.http
      .delete('/api/gardens', new RequestOptions({ body: { ids } }))
      .map(extractData)
      .catch(handleError);
  }

}
