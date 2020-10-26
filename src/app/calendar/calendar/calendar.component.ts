import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'dayGridMonth list',
      center: 'title',
      end: 'today prev next',
    },
    buttonText: {
      month: '月',
      list: 'リスト',
    },
    events: [],
    locale: 'ja',
    dayCellContent(event) {
      event.dayNumberText = event.dayNumberText.replace('日', '');
    },
  };
}
