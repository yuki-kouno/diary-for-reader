import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SeoService } from 'src/app/services/seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private counter: any;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private seoService: SeoService,
    private meta: Meta
  ) {
    this.seoService.setTitleAndMeta();
    this.meta.addTags([
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ]);
    this.counter = setInterval(() => {
      (document.querySelector('.background') as HTMLElement).style.height =
        (document.querySelector('.overlay') as HTMLElement).clientHeight +
        (document.querySelector('app-footer') as HTMLElement).clientHeight +
        'px';
    }, 500);
  }

  signUpDialog() {
    this.dialog.open(SignupFormComponent, {});
  }

  logInDialog() {
    this.dialog.open(LoginFormComponent, {});
  }

  login() {
    this.authService.loginWithGoogle();
  }

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.counter);
  }
}
