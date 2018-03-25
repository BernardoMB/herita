import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';

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

  public userSubscription: Subscription;
  public formModel = {} as ILoginModel;

  public hide: boolean; // for showing the correct icon when displaying the password
  public showExternalContent: boolean = false;
  
  constructor(private store: Store<IApplicationState>,
              private router: Router,
              private elementRef: ElementRef) {}

  ngOnInit() {
    // If the property user of the uiState is not undefined, then navigate to home.
    this.userSubscription = this.store.select(state => state.uiState.user).subscribe(user => {
      if (user) this.router.navigate(['/']);   
    });
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
