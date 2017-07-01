import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { AppService } from './../../app.service';
import { GardenLog } from './../../app';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  logs: Observable<Array<GardenLog>>;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.logs = this.appService.getLogs('');
  }
 }
