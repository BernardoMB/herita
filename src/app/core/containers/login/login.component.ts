import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

interface ILoginModel {
  username: string;
  password: string;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public formModel = {} as ILoginModel;

  public hide: boolean;
  public showExternalContent: boolean = false;
  
  constructor(private router: Router,
              private elementRef: ElementRef) {}

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
  }

  public toggleExternalContent(): void {
    if (this.showExternalContent) {
      this.showExternalContent = false;
    } else {
      this.showExternalContent = true;
    }
  }

  public onLogIn(form: ILoginModel, isValid: boolean): void {
    if (isValid) {
      console.log('Submited', form);
      const user = {
        username: form.username,
        password: form.password
      }
      //this.store.dispatch(new UserLoginAttemptAction(user));
    }
  }

  public onForgot(): void {
    this.router.navigate(['/forgot']);   
  }

  public onSignUp(): void {
    this.router.navigate(['/signup']);   
  }

  public onGoToHomePage(): void {
    this.router.navigate(['/']);   
  }

}
