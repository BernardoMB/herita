import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { UserLoginAttemptAction } from '../../../store/actions/uiState.actions';
import { UserService } from '../../services/user.service';

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
  
  public loginErrorOcurred: boolean = false;
  public loginTypeError: number;
  public loginErrorMessage: string;

  constructor(private store: Store<IApplicationState>,
              private router: Router,
              private elementRef: ElementRef,
              private userService: UserService) {}

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
    this.userService.passLoginError.subscribe(payload => {
      console.log('Login: recieved login error', payload);
      this.loginErrorMessage = payload[0];
      this.loginTypeError = payload[1];
      this.loginErrorOcurred = true;
    });
  }
  
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
  }

  public onLogIn(form: ILoginModel, isValid: boolean): void {
    if (isValid) {
      const credentials = {
        username: form.username,
        password: form.password
      }
      console.log('Dispatching UserLoginAttemptAction');
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
