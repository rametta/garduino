import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { AppService } from './../../app.service';
import { Garden } from './../../app';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  edit = false;
  logs: Array<Garden>;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService
      .getGardens(new Date().toDateString())
      .first()
      .subscribe(logs => this.logs = logs);
  }

  deleteGarden(id: string): void {
    console.log(`Deleting ${id}`);
    this.logs = this.logs.filter(log => log._id !== id);
    this.appService.deleteGarden(id)
      .first()
      .subscribe();
  }
}
