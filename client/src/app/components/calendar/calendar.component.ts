import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

  readonly paramFormat = 'YYYYMMDD'; // Official ISO supported format

  dateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const today = this.calendar.getToday();
    const todayStruct: NgbDateStruct = {
      year: today.year,
      month: today.month,
      day: today.day
    };

    // Initialize date form with today's date
    this.dateForm = this.fb.group({ date: todayStruct });

    // Listen for URL changes to the date queryParam
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params.date) {

          // Everytime URL date queryParam changes, update the calendar input
          const date = moment(params.date);
          const dateStruct: NgbDateStruct = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
          };

          this.dateForm
            .get('date')
            .setValue(dateStruct, { emitEvent: false });
        }
      });

    // Listen for date changes
    this.dateForm
      .get('date')
      .valueChanges
      .forEach((date: NgbDateStruct) => {
        const dateParam = moment([date.year, date.month - 1, date.day]).format(this.paramFormat);
        this.navigate(dateParam);
      });
  }

  navigate(date: string): void {
    this.router.navigate([], { queryParams: { date } });
  }

}
