import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action: String;
  loadingData = true;
  message = 'Please wait... getting the list of rooms'
  reloadAttempts = 0;
  isAdminUser = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData()

    this.authService.roleSetEvent.subscribe(next => {
      if (next.authService.role === 'ADMIN') {
        this.isAdminUser = true;
      } else {
        this.isAdminUser = false;
      }
    })
  }

  loadData() {
    this.dataService.getRooms().subscribe(next => {
        this.rooms = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        console.log('error', error);
        if (error.status === 402) {
          this.message = 'Sorry - payment is required to use this application.'
        } else {
          this.reloadAttempts++;
          if (this.reloadAttempts <= 10) {
            this.message = 'Sorry, something went wrong. Trying again...';
            this.loadData()
          } else {
            this.message = 'Sorry, something went wrong. Please contact support.'
          }
        }
      });
  }

  processUrlParams() {
    // inspect the URL to see if there is a parameter on the path
    this.route.queryParams.subscribe((params) => {
      this.action = null;
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        // cast a variable to a number with '+'
        this.selectedRoom = this.rooms.find( room => room.id === +id);
      }
      if (params['action'] === 'add') {
        this.selectedRoom = new Room();
        this.action = 'edit';
        this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
      }
    });
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'],{ queryParams : { id : id, action : 'view' } });
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], { queryParams : { action : 'add'}});
  }
}
