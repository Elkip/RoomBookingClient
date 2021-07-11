import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user:  User;

  @Output()
  dataChangedEvent = new EventEmitter();

  message: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  editUser(): void {
    this.router.navigate(['admin', 'users'], {queryParams : {action : 'edit', id : this.user.id}});
  }

  deleteUser(): void {
    this.message = 'deleting...';
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }, error => {
        this.message = 'User cannot be deleted.';
      }
    );
  }

  resetPassword(): void {
    this.message = 'Please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => {
        this.message = 'The password has been reset.';
      }, error => {
        this.message = 'Sorry something went wrong.';
      }
    );
  }
}
