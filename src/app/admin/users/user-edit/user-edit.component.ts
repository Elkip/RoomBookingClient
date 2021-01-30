import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/Users";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: User;

  message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
