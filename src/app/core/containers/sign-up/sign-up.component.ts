import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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
  public hide: boolean = true;

  public formModel = {} as ISignUpModel;

  constructor(private elementRef: ElementRef,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
  }

  public onSignUp(form: ISignUpModel, isValid: boolean): void {
    if (isValid) {
      const signUpData = {
        username: form.username,
        email: form.email,
        password: form.password,
        passwordConfirmation: form.passwordConfirmation
      }
      console.log('Sign up data', signUpData);
      //console.log('Dispatching UserLoginAttemptAction');
      //this.store.dispatch(new UserLoginAttemptAction(credentials));
    }
  }

  public onSignIn(): void {
    this.router.navigate(['/login']);
  }

}
