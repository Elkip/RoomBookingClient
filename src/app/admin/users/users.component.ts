import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;
  action: string;
  loadingData = true;
  message = 'Please wait... Getting list of users';

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getUsers().subscribe(next => {
      this.users = next;
      this.loadingData = false;
      this.processUrlParams();
    },
      error => {
        this.message = 'Sorry, something went wrong.'
      });
  }

  setUser(id: number): void {
    this.router.navigate(['admin','users'], {queryParams : {id, action : 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin','users'], { queryParams : { action : 'add' } });
    this.formResetService.resetUserFormEvent.emit(this.selectedUser);
  }

  processUrlParams() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action  = params['action'];
      if (id) {
        this.selectedUser = this.users.find( user => user.id === +id );
      }
    });
  }
}
