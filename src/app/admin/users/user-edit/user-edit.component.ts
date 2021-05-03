import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  @Input()
  user: User;
  @Output()
  dataChangedEvent = new EventEmitter();

  formUser: User;
  password: string;
  password2: string;
  message: string;
  nameIsValid = false;
  passwordIsValid = false;
  passwordsMatch = false;
  userResetSubscription: Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userResetSubscription = this.formResetService.resetUserFormEvent.subscribe( user => {
      this.user = user;
      this.initializeForm();
    });
  }

  ngOnDestroy() {
    this.userResetSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.formUser = Object.assign({}, this.user);
    this.checkNameIsValid();
    this.checkPasswordIsValid();
  }

  onSubmit() {
    this.message = 'Saving...'
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe((user) => {
        this.dataChangedEvent.emit();
        this.router.navigate(["admin", "users"], { queryParams : { action : 'view', id : user.id }});
      });

    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(["admin", "users"], { queryParams : { action : 'view', id : user.id }});
        }, (error) => {
          this.message = 'Something went wrong and the data wasn\'t loaded. Perhaps try again.'
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

  checkPasswordIsValid() {
    if (this.formUser.id != null) {
      this.passwordIsValid = true;
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if (this.password) {
        this.passwordIsValid = this.password.trim().length > 0;
      } else {
        this.passwordIsValid = false;
      }
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
