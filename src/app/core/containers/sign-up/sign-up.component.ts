import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormGroup, ValidatorFn, AbstractControl} from '@angular/forms';
import { ILocation } from '../../../../shared/models/ILocation';

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
  public email = new FormControl('', [Validators.required, Validators.email]);
  public username = new FormControl('', [Validators.required]);
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

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm.reset();
    this.getLocationFromBrowser;
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
    } else if (this.signUpForm.get('email').hasError('email')) {
      return 'Not a valid email';
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
    const user: ISignUpModel = this.signUpForm.value;
    console.log('Credentials', user);
    // Dispatch action.
  }
    

  public onSignIn(): void {
    this.router.navigate(['/login']);
  }

}
