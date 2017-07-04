import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
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
			.delete('/api/gardens', new RequestOptions({ body: { id } }))
			.map(extractData)
			.catch(handleError);
	}

	fakeGarden(
		temperature: number,
		humidity: number,
		moisture: number,
		light: number
	): Observable<Garden> {
		return this.http
			.get('/api/fake', { params: { temperature, humidity, light, moisture } })
			.map(extractData)
			.catch(handleError);
	}

}
