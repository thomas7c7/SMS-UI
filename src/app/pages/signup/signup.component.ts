import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) //angular/Router
    {} 
  
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: [''],
      userName: [''],
      password: ['']
    })
  }

    signUp(): void{
      const user = this.signUpForm.value;
      this.userService.signUp(user).subscribe((result: string) => {
        if(result === 'success'){ //String msg from controller
          this.router.navigate(['']); //Redirecting to login page after user is registered
        } else {
          alert('Unable to register user')
        }
     })
  }
}
