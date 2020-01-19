import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]]
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  submit() {
    console.log(this.form.value);
  }
}
