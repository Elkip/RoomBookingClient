import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.rooms = this.dataService.rooms;
  }

  setRoom(id: number): void {
    this.selectedRoom = this.rooms.find( room => {
      return room.id === id
    });
  }
}
