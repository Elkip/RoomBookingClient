import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.dataService.getUser(13).subscribe(
      next => {
        console.log(next);
        console.log(typeof next);
        console.log(next.getRole())
      });

    this.route.queryParams.subscribe( params => {
      this.selectedDate = params['date'];
      if (!this.selectedDate) {
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      }
      this.dataService.getBookings(this.selectedDate).subscribe( next => this.bookings = next );
    });


  }

  editBooking(id: number): void {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking(): void {
    this.router.navigate(['addBooking'])
  }

  deleteBooking(id: number): void {
    this.dataService.deleteBooking(id).subscribe()
  }

  dateChanged(): void {
    this.router.navigate([''], {queryParams: {date : this.selectedDate}});
  }

}
