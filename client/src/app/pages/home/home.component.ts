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

import { AppService } from './../../app.service';
import { Garden } from './../../app';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  edit = false;
  loading = false;
  logs: Array<Garden>;

  constructor(
    public appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .mergeMap((params: Params) => {
        const date = moment(params.date).toDate().toISOString();
        return this.getGardens(date);
      })
      .subscribe(logs => {
        this.loading = false;
        this.logs = logs;
      });
  }

  getGardens(date: string): Observable<Array<Garden>> {
    this.loading = true;
    return this.appService
      .getGardens(date)
      .first()
  }

  deleteGarden(id: string): void {
    this.loading = true;
    this.appService.deleteGarden(id)
      .first()
      .subscribe(res => {
        this.loading = false;
        if (res) {
          this.logs = this.logs.filter(l => l._id !== id);
        }
      });
  }
}
