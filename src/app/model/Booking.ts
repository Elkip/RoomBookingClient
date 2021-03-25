import {User} from "./Users";
import {Layout, Room} from "./Room";

export class Booking {
  id: number;
  room: Room;
  user: User;
  layout: Layout;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;

  // it's easier to work with dates as strings and use a converter method
  getDateAsDate(): Date {
    return new Date(this.date);
  }
}
