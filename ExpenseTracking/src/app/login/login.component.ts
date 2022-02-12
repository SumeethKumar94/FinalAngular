import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import{AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted=false;
  error='';
  loginUser:User;
  constructor(private formBuilder:FormBuilder,private router:Router,private authservice:AuthService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group(
      {
        username:['',[Validators.required]],
        userpassword:['',[Validators.required]]
      }
    );
  }
  get formControls()
  {
    return this.loginForm.controls;
  }

  loginCredentials()
  {
    this.isSubmitted=true;
   
    if(this.loginForm.invalid)
    {
      console.log("Invalid Attempt to Submit");
      return;
    }
    if(this.loginForm.valid)
    {
      console.log("Valid Form Submitted");
      this.authservice.loginVerify(this.loginForm.controls.username.value,this.loginForm.controls.userpassword.value).subscribe(
        data=>{console.log(data);
        this.loginUser=data;
        console.log(data.empName);
        if(data.empName=="Sumeeth")
        {
        console.log("Goto Admin");
        localStorage.setItem("Username",data.empName);
        sessionStorage.setItem("Username",data.empName);
        sessionStorage.setItem("Token",data.token);
        this.router.navigateByUrl('/admin');
        }
        else if(data.empName!="null")
        {
          console.log("Goto User");

          localStorage.setItem("Username",data.empName);
          sessionStorage.setItem("Username",data.empName);
          sessionStorage.setItem("Token",data.token);
          sessionStorage.setItem("UserId",data.empId); 
          console.log(localStorage.getItem("Username"));
          this.router.navigateByUrl('/user');
        }
        else
        {
         this.error="Invalid Username or Password";
        }
      },
        error=>{this.error="Invalid Username or Password"
      }
      );
  }
}
}


