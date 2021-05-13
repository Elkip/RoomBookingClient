import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {formatDate} from "@angular/common";
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/User";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;
  selectedDate: string;
  message: string;
  dataLoaded = false;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
      if (!this.selectedDate) {
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      }
      this.dataService.getBookings(this.selectedDate).subscribe(next => {
        this.bookings = next;
        this.dataLoaded = true;
        this.message = '';
      }, error => {
        this.message = 'Sorry the data could not be loaded.'
      });

    });

  }

  editBooking(id: number): void {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking(): void {
    this.router.navigate(['addBooking'])
  }

  deleteBooking(id: number): void {
    const result = confirm('Are you sure you wish to delete this booking?');
    if (result) {
      this.message = 'Deleting data...';
      this.dataService.deleteBooking(id).subscribe(next => {
        this.message = '';
        this.loadData();
      }, error => {
        this.message = 'Unable to delete data.';
      });
    }
  }

  dateChanged(): void {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }

}
