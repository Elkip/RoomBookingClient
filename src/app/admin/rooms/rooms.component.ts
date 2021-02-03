import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action: String;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(next => this.rooms = next );
    // inspect the URL to see if there is a parameter on the path
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        // cast a variable to a number with '+'
        this.selectedRoom = this.rooms.find( room => room.id === +id);
      }
      if (params['action'] === 'add') {
        this.selectedRoom = new Room();
        this.action = 'edit';
      }
    });
  }

  setRoom(id: number): void {
    this.router.navigate(['admin', 'rooms'],{ queryParams : { id : id, action : 'view' } });
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], { queryParams : { action : 'add'}});
  }
}
