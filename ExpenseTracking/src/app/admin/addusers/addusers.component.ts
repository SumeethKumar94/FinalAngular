import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './addusers.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,public userservice:UserService,private authservice:AuthService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.userservice.bindListUsers();
    this.userservice.userlen;
  }
  OnSubmit(forms:NgForm)
  {
    this.AddUser(forms);
    this.toaster.success('Added User Sucessfully','Add User');
    this.router.navigateByUrl('/admin/view');
  }
  AddUser(forms:NgForm)
  {
    console.log("Adding a Record..");
    this.userservice.AddUser(forms.value).subscribe(
      (result)=>{
        console.log(forms.value);
        console.log(result);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
