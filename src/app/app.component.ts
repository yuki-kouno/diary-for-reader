import { Component } from '@angular/core';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diary-for-reader';

  constructor(private nav: NavService) {}

  ngOnInit(){
    this.nav.show();
  }
}
