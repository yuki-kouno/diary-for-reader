import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SeoService } from 'src/app/services/seo.service';
import { Meta } from '@angular/platform-browser';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: 2500 })],
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  @HostListener('window:scroll', ['$event'])
  observClientY() {
    this.clientY = window.pageYOffset + this.clientHeight;
  }
  clientHeight: number;
  clientY: number;
  topIllustration = 1000;
  how = 1000;
  sceneFirst = 1000;
  sceneSecond = 1000;
  sceneThird = 1000;

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

  ngAfterViewInit() {
    this.clientHeight = window.parent.screen.height;
    this.topIllustration = Math.floor(
      document.querySelector('.top-illustration').getBoundingClientRect().y
    );
    this.how = Math.floor(
      document.querySelector('.how__description').getBoundingClientRect().y
    );
    this.sceneFirst = Math.floor(
      document.querySelector('.scene_first').getBoundingClientRect().y
    );
    this.sceneSecond = Math.floor(
      document.querySelector('.scene_second').getBoundingClientRect().y
    );
    this.sceneThird = Math.floor(
      document.querySelector('.scene_third').getBoundingClientRect().y
    );
  }
}
