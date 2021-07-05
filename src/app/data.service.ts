import {Injectable} from '@angular/core';
import {Layout, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms').pipe(
      map(data => {
        const rooms = new Array<Room>();
        for (const room of data) {
          rooms.push(Room.fromHttp(room));
        }
        return rooms;
      })
    );
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users').pipe(
      map(data => {
        const users = new Array<User>();
        for (const user of data) {
          users.push(User.fromHttp(user));
        }
        return users;
      }
    ));
  }

  getBookings(date: string) : Observable<Array<Booking>> {
    return this.http.get<Array<Booking>>(environment.restUrl + "/api/bookings/" + date)
      .pipe(
        map ( data => {
          const bookings = new Array<Booking>();
          for (const booking of data) {
            bookings.push(Booking.fromHttp(booking));
          }
          return bookings;
        })
      );
  }

  getBooking(id: number) : Observable<Booking> {
    return this.http.get<Booking>(environment.restUrl + '/api/bookings?id=' +id)
      .pipe(
        map( data => Booking.fromHttp(data))
      )
  }

  getCorrectedBooking(booking: Booking) {
    let correctLayout;
    for (let l in Layout) {
      if (booking.layout === Layout[l]) {
        correctLayout = l;
      }
    }

    if (booking.startTime.length < 8) {
      booking.startTime = booking.startTime + ':00';
    }

    if (booking.endTime.length < 8) {
      booking.endTime = booking.endTime + ':00';
    }

    const correctedBooking = {id : booking.id, room : this.getCorrectedRoom(booking.room), user: booking.user,
    title : booking.title, date : booking.date, startTime : booking.startTime, endTime : booking.endTime,
      participants : booking.participants, layout : correctLayout};

    return correctedBooking;
  }

  saveBooking(booking: Booking): Observable<Booking>{
    return this.http.put<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(booking));
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(newBooking));
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/bookings/' + id);
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>(environment.restUrl + '/api/users/', user);
  }

  addUser(newUser: User, password: String): Observable<User> {
    const fullUser = { id: newUser.id, name: newUser.name, password: password };
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/users/' + id);
  }

  resetPassword(id: number): Observable<any> {
    return this.http.get(environment.restUrl + '/api/users/resetPassword/' + id);
  }

  private getCorrectedRoom(room: Room) {
    const correctRoom = { id: room.id, name: room.name, location: room.location, capacities: []};
    for (const lc of room.capacities) {

      let correctLayout;
      for (let member in Layout) {
        if (Layout[member] === lc.layout) {
          correctLayout = member;
        }
      }

      const correctedLayout = { layout: correctLayout, capacity: lc.capacity };
      correctRoom.capacities.push(correctedLayout);
    }
    return correctRoom;
  }

  updateRoom(room: Room): Observable<Room> {
    const correct = this.getCorrectedRoom(room);
    return this.http.put<Room>(environment.restUrl + '/api/rooms', correct);
  }

  addRoom(newRoom: Room): Observable<Room> {
    console.log(newRoom);
    const correct = this.getCorrectedRoom(newRoom);
    return this.http.post<Room>(environment.restUrl + '/api/rooms', correct);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/rooms/' + id);
  }

  validateUser(name: string, password: string): Observable<string> {
    // btoa - binary to ascii
    const authData = btoa(`${name}:${password}`)
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + '');
    return this.http.get<string>(environment.restUrl + '/api/basicAuth/validate', { headers : headers})
  }

  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
  }
}
