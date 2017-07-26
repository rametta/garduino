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
	error;
	showError = false;

  // Chart
  chartData = [];
  colorScheme = {
    domain: ['#2dc473', '#b326cc', '#2684cc', '#cc2626']
  };

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
        this.generateChartPoints();
      }, err => {
				this.loading = false;
				this.error = err;
				this.showError = true;
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
        if (modifedCount > 0) {
          this.generateChartPoints();
        }
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
        this.generateChartPoints();
      }, err => {
				this.loading = false;
				this.error = err;
				this.showError = true;
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
          this.generateChartPoints();
        }
      }, err => {
				this.loading = false;
				this.error = err;
				this.showError = true;
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
      .subscribe(savedGardens => {
        this.loading = false;
        if (savedGardens.length > 0) {
          savedGardens.forEach(garden => {
            this.gardens.push(garden);
          });
        }
        this.generateChartPoints();
      }, err => {
				this.loading = false;
				this.error = err;
				this.showError = true;
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

  generateChartPoints(): void {
    this.chartData = [
      {
        name: 'Temperature',
        series: []
      },
      {
        name: 'Humidity',
        series: []
      },
      {
        name: 'Light Level',
        series: []
      },
      {
        name: 'Moisture',
        series: []
      }
    ];

    this.gardens.forEach(g => {
      const name = moment(g.date).format('LTS');

      if (g.temperature) {
        this.chartData[0].series.push({ name, value: g.temperature });
      }

      if (g.humidity) {
        this.chartData[1].series.push({ name, value: g.humidity });
      }

      if (g.light) {
        this.chartData[2].series.push({ name, value: g.light });
      }

      if (g.moisture) {
        this.chartData[3].series.push({ name, value: g.moisture });
      }
    });
  }
}
