import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { UserLoginAttemptAction } from '../../../store/actions/uiState.actions';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public loginForm = new FormGroup({
    username: this.username,
    password: this.password
  });
  
  public userSubscription: Subscription;

  public hide: boolean = true;
  
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
      this.loginTypeError = payload[1];
      if (this.loginTypeError == 0) {
        // No error from server.
        this.loginErrorOcurred = false;
        this.loginErrorMessage = null;
      } else {
        console.log('Login: recieved login error', payload);
        this.loginErrorOcurred = true;
        this.loginErrorMessage = payload[0];
      }
    });
  }
  
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
  }
  
  get isValid(): boolean {
    return this.loginForm.valid && !this.loginForm.pristine;
  }

  public onSubmit(): void {
    if (!this.isValid) {
      return;
    };
    const credentials: ILoginModel = this.loginForm.value;
    console.log('Dispatching UserLoginAttemptAction with credentials', credentials);
    this.store.dispatch(new UserLoginAttemptAction(credentials));
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
