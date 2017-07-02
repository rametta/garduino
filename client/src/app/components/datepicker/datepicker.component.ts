import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  readonly paramFormat = 'YYYYMMDD'; // Official ISO supported format
  readonly displayFormat = 'ddd MMM DD';

  todayStr = moment(new Date()).format(this.paramFormat);

  dayMinus2Param: string;
  dayMinus1Param: string;
  todayParam: string;
  dayPlus1Param: string;
  dayPlus2Param: string;

  dayMinus2Display: string;
  dayMinus1Display: string;
  todayDisplay: string;
  dayPlus1Display: string;
  dayPlus2Display: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.calculateDays();

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params.date) {
          this.todayStr = params.date;
          this.calculateDays();
        }
      });
  }

  calculateDays(): void {
    const today = moment(this.todayStr);
    // Params
    this.dayMinus2Param = moment(today).subtract(2, 'days').format(this.paramFormat);
    this.dayMinus1Param = moment(today).subtract(1, 'day').format(this.paramFormat);
    this.todayParam = moment(today).format(this.paramFormat);
    this.dayPlus1Param = moment(today).add(1, 'day').format(this.paramFormat);
    this.dayPlus2Param = moment(today).add(2, 'days').format(this.paramFormat);

    // Display
    this.dayMinus2Display = moment(today).subtract(2, 'days').format(this.displayFormat);
    this.dayMinus1Display = moment(today).subtract(1, 'day').format(this.displayFormat);
    this.todayDisplay = moment(today).format(this.displayFormat);
    this.dayPlus1Display = moment(today).add(1, 'day').format(this.displayFormat);
    this.dayPlus2Display = moment(today).add(2, 'days').format(this.displayFormat);
  }

}
