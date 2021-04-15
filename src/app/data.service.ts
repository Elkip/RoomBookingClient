import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Array<Room>> {
    return of(null);
  }

  getUsers(): Observable<Array<User>> {
    return of(null);
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return of(null);
  }

  getBooking(id: number): Observable<Booking> {
    return of(null);
  }

  saveBooking(booking: Booking): Observable<Booking>{
    return of(null);
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }

  updateUser(user: User) : Observable<User> {
    return of(null);
  }

  addUser(newUser: User, password: String): Observable<User> {
    return of(null);
  }

  deleteUser(id: number): Observable<any> {
    return of(null);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(null);
  }

  addRoom(newRoom: Room): Observable<Room> {
    return of(null);
  }

  deleteRoom(id: number): Observable<any> {
    return of(null);
  }

  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(environment.restUrl + '/api/users/' + id)
      .pipe(
        map( data => {
          return User.fromHttp(data);
        })
      );
  }
}
