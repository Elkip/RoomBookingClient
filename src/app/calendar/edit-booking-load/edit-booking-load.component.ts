import { Component, OnInit } from '@angular/core';
import {EditBookingDataService} from "../../edit-booking-data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-booking-load',
  templateUrl: './edit-booking-load.component.html',
  styleUrls: ['./edit-booking-load.component.css']
})
export class EditBookingLoadComponent implements OnInit {

  constructor(private EditBookingDataService: EditBookingDataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => this.navigateWhenReady(), 1000);
  }

  navigateWhenReady() {
    /* check if service data is loaded
     if yes, navigate to edit component
     if not, wait 500ms then try again */
    if (this.EditBookingDataService.dataLoaded === 2) {
      const id = this.route.snapshot.queryParams['id'];
      if (id) {
        this.router.navigate(['editBooking'], {queryParams: {id}});
      } else {
        this.router.navigate(['addBooking']);
      }
    } else {
      setTimeout(() => this.navigateWhenReady(), 500);
    }
  }
}
