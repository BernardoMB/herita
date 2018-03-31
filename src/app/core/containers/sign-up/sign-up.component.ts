import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormGroup, ValidatorFn, AbstractControl} from '@angular/forms';
import { ILocation } from '../../../../shared/models/ILocation';
import { IUser } from '../../../../shared/models/IUser';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { CreateUserAction } from '../../../store/actions/uiState.actions';
import { UserService } from '../../services/user.service';

// TODO: delete
interface ISignUpModel {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public username = new FormControl('', [Validators.required, this.usernameValidator]);
  public email = new FormControl('', [Validators.required, this.emailValidator]);
  public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public passwordConfirmation = new FormControl('', [Validators.required]);
  public signUpForm = new FormGroup ({
    username: this.username,
    email: this.email,
    password: this.password,
    passwordConfirmation: this.passwordConfirmation
  }, this.passwordConfirming);

  public hide: boolean = true;

  public location: ILocation;

  public signUpErrorOcurred: boolean = false;
  public signUpTypeError: number;
  public signUpErrorMessage: string;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<IApplicationState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signUpForm.reset();
    this.getLocationFromBrowser;
    this.userService.passSignUpError.subscribe(payload => {
      this.signUpTypeError = payload[1];
      if (this.signUpTypeError == 0) {
        // No error from server.
        this.signUpErrorOcurred = false;
        this.signUpErrorMessage = null;
      } else {
        console.log('SignUp: recieved sigup error', payload);
        this.signUpErrorOcurred = true;
        this.signUpErrorMessage = payload[0];
      }
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
  }

  private getLocationFromBrowser(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = { lat: position.coords.latitude, lng: position.coords.longitude }
      });
    } else {
      alert('Can not get location from browser');
    }    
  }

  public getEmailErrorMessage() {
    if (this.signUpForm.get('email').hasError('required')) {
      return 'You must enter a value';
    } else if (this.signUpForm.get('email').hasError('invalidEmail')) {
      return 'Not a valid email';
    } else {
      return '';
    }
  }

  public getUsernameErrorMessage() {
    if (this.signUpForm.get('username').hasError('required')) {
      return 'You must enter a value';
    } else if (this.signUpForm.get('username').hasError('invalidUsername')) {
      return 'No spaces allowed';
    } else {
      return '';
    }
  }

  public getPasswordErrorMessage() {
    if (this.signUpForm.get('password').hasError('required')) {
      return 'You must enter a value';
    } else if (this.signUpForm.get('password').hasError('minlength')) {
      return 'At least 6 characters required';
    } else {
      return '';
    }
  }

  public getPasswordConfirmationErrorMessage() {
    if (this.signUpForm.get('passwordConfirmation').hasError('required')) {
      return 'You must retype your password';
    } else if (this.signUpForm.get('passwordConfirmation').hasError('noMatch')) {
      return 'Passwords do not match';
    } else {
      return '';
    }
  }

  public usernameValidator(c: FormControl): {[key: string]: any} {
    const regexp = new RegExp(/^\S*$/);
    const isValid: boolean = regexp.test(c.value);
    if (isValid) {
      return null;
    } else {
      return {'invalidUsername': {value: c.value}};
    }
  }

  public emailValidator(c: FormControl): {[key: string]: any} {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const isValid: boolean = regexp.test(c.value);
    if (isValid) {
      return null;
    } else {
      return {'invalidEmail': {value: c.value}};
    }
  }

  public passwordConfirming(c: AbstractControl): {[key: string]: any} {
    if (c.get('password').value !== c.get('passwordConfirmation').value) {
      c.get('passwordConfirmation').setErrors({'noMatch': true});
      return {'noMatch': {value: c.get('passwordConfirmation').value}};
    } else {
      return null;
    }
  }
  
  get isValid() {
    return this.signUpForm.valid && !this.signUpForm.pristine;
  }

  public onSubmit() {
    if (!this.isValid) {
      //alert('Invalid form');
      return;
    };
    const credentials: ISignUpModel = this.signUpForm.value;
    console.log('Credentials', credentials);
    const user: IUser = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      rol: 2
    }
    this.store.dispatch(new CreateUserAction(user));
  }
    
  public onSignIn(): void {
    this.router.navigate(['/login']);
  }

}
