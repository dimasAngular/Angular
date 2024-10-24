import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

import { Component, inject, signal } from '@angular/core';

import {   FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';


@Component({
  selector: 'app-login-pages',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css'] 
})


export class LoginPagesComponent {
  authService = inject(AuthService)

  router = inject(Router)

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });


  isPasswordVisible = signal<boolean>(false)



  onSubmit() {
    if (this.form.valid) {
      //  @ts-ignore 
      this.authService.login(this.form.value)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate([''])
        }
      )
      
    } 
  }
  

}
