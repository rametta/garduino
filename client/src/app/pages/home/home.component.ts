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
  gardensToDelete: Array<string> = [];

  constructor(
    public appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .mergeMap((params: Params) => {
        this.params = params;
        return this.getGardens$(params.date || new Date().toISOString());
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

  /**
   * Update a garden
   * @param {Garden} garden The garden to update
   */
  putGarden(garden: Garden): void {
    this.loading = true;
    this.appService
      .putGarden(garden)
      .first()
      .subscribe(modifedCount => {
        this.loading = false;
      });
  }

  /**
   * Get gardens
   */
  getGardens(): void {
    this.getGardens$(this.params.date || new Date().toISOString())
      .subscribe(gardens => {
        this.loading = false;
        this.gardens = gardens;
      });
  }

  /**
   * Delete gardens
   * @param {Array<string>} ids The array of ids to delete
   */
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

  /**
   * Insert new gardens
   * @param {Array<Garden>} gardens The array of Garden objects to insert
   */
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

    if (this.params.date) {
      const now = new Date();
      const date = moment(this.params.date)
        .hours(now.getHours())
        .minutes(now.getMinutes())
        .seconds(now.getSeconds())
        .milliseconds(now.getMilliseconds());
      garden.date = date.toISOString();
    } else {
      garden.date = new Date().toISOString();
    }
    this.postGardens([garden]);
  }

  saveGardens(): void {
    if (this.gardensToDelete.length > 0) {
      this.deleteGardens(this.gardensToDelete);
      this.resetGardensToDelete();
    }
    this.gardens.forEach(garden => this.putGarden(garden));
  }

  // Remove garden from local array.
  tempDeleteGarden(id: string): void {
    this.gardensToDelete.push(id);
    this.gardens = this.gardens.filter(g => g._id !== id);
  }

  resetGardensToDelete(): void {
    this.gardensToDelete = [];
  }
}
