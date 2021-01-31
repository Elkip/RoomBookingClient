import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/Users";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: User;

  formUser: User;
  password: string;
  password2: string;
  message: string;
  nameIsValid = false;
  passwordIsValid = false;
  passwordsMatch = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
  }

  onSubmit() {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe((user) => {
        this.router.navigate(["admin", "users"], { queryParams : { action : 'view', id : user.id }});
      })
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(["admin", "users"], { queryParams : { action : 'view', id : user.id }});
        }
      );
    }

  }

  checkNameIsValid(): void {
    if (this.formUser.name) {
      this.nameIsValid = (this.formUser.name.trim().length > 0);
    } else {
      this.nameIsValid = false;
    }
  }

  checkPasswordIsValid(): void {
    if (this.password) {
      this.passwordIsValid = (this.password.trim().length > 0);
    }  else {
      this.passwordIsValid = false;
    }
  }

  checkPasswordsMatch(): void {
    if (this.password2 && this.passwordIsValid) {
      this.passwordsMatch = this.password === this.password2;
    } else {
      this.passwordsMatch = false;
    }
  }

}
