import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe( next => this.bookings = next );
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

}
