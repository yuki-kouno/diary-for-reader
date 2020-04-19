import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weeks = ['日', '月', '火', '水', '木', '金', '土'];
  nowDate = new Date();
  year = this.nowDate.getFullYear();
  month = this.nowDate.getMonth() + 1;
  config = { show: 1 };

  showCalendar(year, month) {
    for (let i = 0; i < this.config.show; i++) {
      const calendarHtml = this.createCalendar(this.year, this.month);
      const sec = document.createElement('section');
      sec.innerHTML = calendarHtml;
      document.querySelector('#calendar').appendChild(sec);

      month++;
      if (month > 12) {
        year++;
        month = 1;
      }
    }
  }

  createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
    const endDate = new Date(year, month, 0); // 月の最後の日を取得
    const endDayCount = endDate.getDate(); // 月の末日
    const lastMonthEndDate = new Date(year, month - 2, 0); // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日
    const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
    let dayCount = 1; // 日にちのカウント
    let calendarHtml = ''; // HTMLを組み立てる変数

    calendarHtml += '<h1>' + year + '/' + month + '</h1>';
    calendarHtml += '<table>';

    // 曜日の行を作成
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.weeks.length; i++) {
      calendarHtml += '<td>' + this.weeks[i] + '</td>';
    }

    for (let w = 0; w < 6; w++) {
      calendarHtml += '<tr>';

      for (let d = 0; d < 7; d++) {
        if (w === 0 && d < startDay) {
          // 1行目で1日の曜日の前
          const num = lastMonthendDayCount - startDay + d + 1;
          calendarHtml += '<td class="is-disabled">' + num + '</td>';
        } else if (dayCount > endDayCount) {
          // 末尾の日数を超えた
          const num = dayCount - endDayCount;
          calendarHtml += '<td class="is-disabled">' + num + '</td>';
          dayCount++;
        } else {
          calendarHtml += `<td class="calendar_td" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`;
          dayCount++;
        }
      }
      calendarHtml += '</tr>';
    }
    calendarHtml += '</table>';
    return calendarHtml;
  }

  moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = '';

    if (e.target.id === 'prev') {
      this.month--;

      if (this.month < 1) {
        this.year--;
        this.month = 12;
      }
    }

    if (e.target.id === 'next') {
      this.month++;

      if (this.month > 12) {
        this.year++;
        this.month = 1;
      }
    }

    this.showCalendar(this.year, this.month);
  }

  clickCalendar(e) {
    // tslint:disable-next-line: only-arrow-functions
    document.addEventListener('click', function() {
      if (e.target.classList.contains('calendar_td')) {
        alert('クリックした日付は' + e.target.dataset.date + 'です');
      }
    });
  }

  constructor() {

  }

  ngOnInit() {
    document
      .querySelector('#prev')
      .addEventListener('click', this.moveCalendar);
    document
      .querySelector('#next')
      .addEventListener('click', this.moveCalendar);
    this.showCalendar(this.year, this.month);
  }
}
