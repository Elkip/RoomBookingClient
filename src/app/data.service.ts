import { Injectable } from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>;

  constructor() {
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = "Living Room";
    room1.location = "First Floor";

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 100;
    room1.capacities.push(capacity1);

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 10;
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.name = "Bedroom";
    room2.location = "Second Floor";

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.BOARD;
    capacity3.capacity = 50;
    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2)
  }
}
