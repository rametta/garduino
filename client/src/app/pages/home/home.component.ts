import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
  NavigationExtras
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';

import * as moment from 'moment';

import { AppService, Garden } from './../../app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  edit = false;
  loading = false;
  gardens: Array<Garden>;
  params: Params;

  constructor(
    public appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .mergeMap((params: Params) => {
        this.params = params;
        const date = moment(params.date).toDate().toISOString();
        return this.getGardens$(date);
      })
      .subscribe(gardens => {
        console.log(gardens)
        this.loading = false;
        this.gardens = gardens;
      });
  }

  getGardens$(date: string): Observable<Array<Garden>> {
    this.loading = true;
    return this.appService
      .getGardens(date)
      .first()
  }

  putGardens(gardens = this.gardens): void {
    this.loading = true;
    this.appService
      .putGardens(this.gardens)
      .first()
      .subscribe(gardens => {
        console.log(gardens);
        this.loading = false;
        this.gardens = gardens;
      });
  }

  getGardens(): void {
    this.getGardens$(this.params.date)
      .subscribe(gardens => {
        this.loading = false;
        this.gardens = gardens;
      });
  }

  deleteGardens(ids: Array<string>): void {
    this.loading = true;
    this.appService
      .deleteGardens(ids)
      .first()
      .subscribe(deleteCount => {
        console.log(deleteCount);
        this.loading = false;
        if (deleteCount > 0) {
          this.gardens = this.gardens.filter(l => !(ids.indexOf(l._id) > -1));
        }
      });
  }

  postGardens(gardens: Array<Garden>): void {
    this.loading = true;
    this.appService
      .postGardens(gardens)
      .first()
      .subscribe(gardens => {
        this.loading = false;
        if (gardens.length > 0) {
          gardens.forEach(garden => {
            this.gardens.push(garden);
          });
        }
      });
  }

  newGarden(): void {
    const garden = new Garden();
    garden.date = moment(this.params.date || new Date()).toDate().toISOString();
    this.postGardens([garden]);
  }
}
