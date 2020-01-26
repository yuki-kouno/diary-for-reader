import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { NavService } from 'src/app/services/nav.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]]
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private nav: NavService,
    public dialog: MatDialog
    ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.nav.hide();
  }

  submit() {
    console.log(this.form.value);
  }
}
