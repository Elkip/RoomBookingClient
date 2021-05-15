import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Layout, Room} from "../../model/Room";
import {User} from "../../model/User";
import {map} from "rxjs/operators";

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
  dataLoaded = false;
  message = 'Please wait...'

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.rooms = this.route.snapshot.data['rooms']
    this.users = this.route.snapshot.data['users']

    const id = this.route.snapshot.queryParams['id']
    if (id) {
      this.dataService.getBooking(+id)
        .pipe(
          map (booking => {
            booking.room = this.rooms.find(room => room.id === booking.room.id);
            booking.user = this.users.find(user => user.id === booking.user.id);
            return booking;
          })
        )
        .subscribe(next => {
        this.booking = next;
        this.dataLoaded = true;
        this.message = '';
      });
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
      this.message = '';
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
