import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export const extractData = (res: Response) => {
	const body = res.json();
	return body || {};
};

export const handleError = (error: Response | any) => {
	console.error(error);
	return Observable.throw(error);
};