import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
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
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
    this.dataService.getUsers().subscribe(
      next => this.users = next
    );
  }

  onSubmit(): void {
    console.log("LOL");
  }

}
