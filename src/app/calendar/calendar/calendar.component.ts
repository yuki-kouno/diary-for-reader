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
import { LoadingService } from 'src/app/services/loading.service';
import { SeoService } from 'src/app/services/seo.service';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  title = 'カレンダー';

  calendarOptions: CalendarOptions = {
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'title',
      end: 'prev next',
    },
    locale: 'ja',
    buttonText: {},
    dayMaxEventRows: 2,
    views: {
      dayGrid: {
        moreLinkText: '件',
      },
    },
    eventBackgroundColor: 'rgba(111, 214, 255, 1)',
    eventBorderColor: 'rgba(0, 0, 0, 0)',
    events: [],
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
    private router: Router,
    private seoService: SeoService,
    public loadingService: LoadingService
  ) {
    this.loadingService.loading = true;
    this.seoService.setTitleAndMeta(this.title);
  }
  ngOnInit() {
    this.getCalendarData();
  }

  getCalendarData() {
    this.dbReviewService
      .getReviewsOfAllBooks()
      .subscribe((reviews: Review[]) => {
        const reviewArray = [];
        reviews.forEach((review: Review) => {
          const DATE_FORMAT = 'yyyyMMdd';
          const transformDate = this.datePipe.transform(
            review.createdAt.toDate(),
            DATE_FORMAT
          );
          const obj = {
            question: review.question,
            answer: review.answer,
          };
          const reviewObj = {
            title: review.title,
            bookId: review.bookId,
            thumbnail: review.thumbnail,
            dialogTitle: review.title,
            date: transformDate,
            data: [obj],
          };
          const i = reviewArray.findIndex(
            (element) =>
              element.bookId === reviewObj.bookId &&
              element.date === reviewObj.date
          );
          if (i > -1) {
            reviewArray[i].data.push(obj);
          } else {
            reviewArray.push(reviewObj);
          }
        });

        this.calendarOptions.events = reviewArray;
        this.loadingService.loading = false;
      });
  }

  openDialog(obj) {
    const event_def = obj.event._def.extendedProps;
    const id = event_def.bookId;
    this.matDialog
      .open(ReviewDetailDialogComponent, {
        data: {
          title: event_def.title,
          bookId: event_def.bookId,
          thumbnail: event_def.thumbnail,
          dialogTitle: event_def.dialogTitle,
          data: event_def.data,
        },
        autoFocus: false,
        maxHeight: '80vh',
      })
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.router.navigate(['review', id]);
        }
      });
  }
}
