import { Component, OnInit } from '@angular/core';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  dataArray: EventData[] = [
    {
      id: 1,
      title: 'aaa',
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
}
