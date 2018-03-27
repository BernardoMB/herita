import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { UserLoginAttemptAction } from '../../../store/actions/uiState.actions';

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

  public hide: boolean = true; // for showing the correct icon when displaying the password
  public showExternalContent: boolean = false;
  
  constructor(private store: Store<IApplicationState>,
              private router: Router,
              private elementRef: ElementRef) {}

  ngOnInit() {
    // If the property user of the uiState is not undefined, then navigate to home.
    this.userSubscription = this.store.select(state => state.uiState.user).subscribe(user => {
      if (user) {
        console.log('Login: Found user in uiState', user);
        console.log('Login: Redirecting to "/"');
        this.router.navigate(['/']);
      }
      console.log('Login: No user in uiState');
      console.log('Login: User must enter credentials');
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
      const credentials = {
        username: form.username,
        password: form.password
      }
      this.store.dispatch(new UserLoginAttemptAction(credentials));
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
