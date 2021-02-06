import { EventEmitter, Injectable } from '@angular/core';
import {Room} from "./model/Room";
import {User} from "./model/Users";

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetRoomFormEvent = new EventEmitter<Room>();
  resetUserFormEvent = new EventEmitter<User>();

  constructor() { }
}
