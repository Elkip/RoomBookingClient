import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/Users";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room>;
  private users: Array<User>;
  private bookings: Array<Booking>;

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  getBookings(): Observable<Array<Booking>> {
    return of(this.bookings);
  }

  updateUser(user: User) : Observable<User> {
    const originalUser = this.users.find(u => u.id === user.id);
    originalUser.name = user.name;
    return of(originalUser);
  }

  addUser(newUser: User, password: String): Observable<User> {
    let id = 0;
    for (const user of this.users) {
      if (user.id > id) {
        id = user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  deleteUser(id: number): Observable<any> {
    const user = this.users.find( p => p.id === id);
    this.users.splice(this.users.indexOf(user), 1);
    return of(null);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }

  updateRoom(room: Room): Observable<Room> {
    const origRoom = this.rooms.find( r => r.id === room.id);
    origRoom.name = room.name;
    origRoom.location = room.location;
    origRoom.capacities = room.capacities;
    return of(origRoom);
  }

  addRoom(newRoom: Room): Observable<Room> {
    let id = 0;
    for (const room of this.rooms) {
      if (room.id > id) {
        id = room.id;
      }
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom)
  }

  deleteRoom(id: number): Observable<any> {
    const room = this.rooms.find(r => r.id === id);
    this.rooms.splice(this.rooms.indexOf(room), 1);
    // If the room is deleted it should reach this null event
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    const booking = this.bookings.find(r => r.id === id);
    this.bookings.splice(this.bookings.indexOf(booking), 1);
    return of(null);
  }

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
    this.rooms.push(room2);

    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'Bob Barker';
    this.users.push(user1);

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Drew Carry';
    this.users.push(user2);

    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = "Example meeting";
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.USHAPE;
    booking2.title = "Lone Ranger Support Group";
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    booking2.startTime = '12:59';
    booking2.endTime = '1:00';
    booking2.participants = 1;

    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }

}
