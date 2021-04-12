import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Layout, Room} from "../../model/Room";
import {User} from "../../model/Users";

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {

  booking: Booking;
  rooms: Array<Room>;
  users: Array<User>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
    this.dataService.getUsers().subscribe(
      next => this.users = next
    );

    const id = this.route.snapshot.queryParams['id']
    if (id) {
      this.dataService.getBooking(+id).subscribe(next => this.booking = next);
    } else {
      this.booking = new Booking();
    }

  }

  onSubmit(): void {
    if (this.booking.id == null) {
      this.dataService.addBooking(this.booking).subscribe(next => this.router.navigate(['']))
    } else {
      this.dataService.saveBooking(this.booking).subscribe(next => this.router.navigate(['']));
    }
  }
}
