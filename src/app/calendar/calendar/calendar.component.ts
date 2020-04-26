import { Component, OnInit } from '@angular/core';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';

export const testData: EventData[] = [];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  dataArray: EventData[] = testData;

  selectDay(event) {
    console.log(event);
  }

  constructor() {}

  ngOnInit() {}
}
