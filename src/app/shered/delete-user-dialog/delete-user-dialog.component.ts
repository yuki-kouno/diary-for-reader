import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent implements OnInit {
  form: FormControl = new FormControl('');
  constructor(private userService: UserService) {}

  deleteUser() {
    this.userService.deleteUser();
  }

  ngOnInit(): void {}
}
