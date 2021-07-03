import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = "";
  name: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.authService.authenticate(this.name, this.password)) {
      //navigate
    } else {
      this.message = 'Your username and password was not found - try again'
    }
  }

}
