import { AuthService } from './auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  // @ViewChild('authForm')

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.signin(email, password).subscribe((resData) => {
        console.log(resData);
      });
    } else {
      this.authService.signup(email, password).subscribe(
        (resData) => {
          if (resData) {
            alert('Sign-up completed successfully');
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
    form.reset();
  }
}
