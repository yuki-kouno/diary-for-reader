import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/angular';
import { Review } from 'src/app/interface/review';
import { DatabaseReviewsService } from 'src/app/services/database-reviews.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDetailDialogComponent } from '../review-detail-dialog/review-detail-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  reviewArrray = [];
  reviews = this.dbReviewService
    .getReviewsOfAllBooks()
    .subscribe((reviews: Review[]) => {
      reviews.forEach((review: Review) => {
        const DATE_FORMAT = 'yyyyMMdd';
        const transformDate = this.datePipe.transform(
          review.createdAt.toDate(),
          DATE_FORMAT
        );
        this.reviewArrray.push({
          date: transformDate,
          title: review.title,
          question: review.question,
          answer: review.answer,
          thumbnail: review.thumbnail,
          bookId: review.bookId,
        });
        this.calendarOptions.events = this.reviewArrray;
      });
    });

  calendarOptions: CalendarOptions = {
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'today',
      center: 'title',
      end: 'prev next',
    },
    buttonText: {
      month: '月',
    },
    eventBackgroundColor: '#ffc400',
    eventBorderColor: '#ffc400',
    events: [],
    locale: 'ja',
    displayEventTime: false,
    dayCellContent(event) {
      event.dayNumberText = event.dayNumberText.replace('日', '');
    },
    eventClick: (event) => {
      this.openDialog(event);
    },
  };

  constructor(
    private dbReviewService: DatabaseReviewsService,
    private datePipe: DatePipe,
    private matDialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {}

  openDialog(obj) {
    const id = obj.event._def.extendedProps.bookId;
    this.matDialog
      .open(ReviewDetailDialogComponent, {
        data: {
          title: obj.event._def.title,
          question: obj.event._def.extendedProps.question,
          answer: obj.event._def.extendedProps.answer,
          thumbnail: obj.event._def.extendedProps.thumbnail,
          bookId: obj.event._def.extendedProps.bookId,
        },
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.router.navigate(['review', id]);
        }
      });
  }
}
