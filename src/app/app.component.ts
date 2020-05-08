import { Component } from '@angular/core';
import { NavService } from './services/nav.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.authService.afUser$;

  constructor(private nav: NavService, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
