import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule], //need to do these imports inorder to use FormBuilder and FormsModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

//OnInit because the login component does something
export class LoginComponent implements OnInit{

loginForm: FormGroup; //creating a form, FormGroup comes from angular

constructor(private formBuilder: FormBuilder, //Constructor injection, FormBuilder comes from angular
  private userService: UserService,
  private router: Router) //angular/Router
  {} 

ngOnInit(): void{
this.loginForm = this.formBuilder.group({ //Creates a loginForm values using formBuilder
  userName:['', Validators.required], //blank default value
  password: ['', Validators.required, Validators.maxLength(20)] //Validators
  })
}

//Defines a function, What happens when login form is initialized.
login(): void {
  const user = this.loginForm.value;  // user is data extracte from user.service
  this.userService.login(user).subscribe((user: User) => { //subscribe waits for observable data and acts on it
    if(user.userId) {
      this.router.navigate(['list']); //takes user to student list page after loggin in
        } else {
      alert('Invalid username or password');
    }
  })
 }
}
 