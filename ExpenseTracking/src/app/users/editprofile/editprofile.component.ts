import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
id:number=+sessionStorage.getItem("UserId");
  constructor(private formBuilder:FormBuilder,public userservice:UserService,private authservice:AuthService,private router:Router,private toaster:ToastrService)
   { }
   onSubmit(form:NgForm)
   {
     console.log(form.value);
     form.value.Userid=this.id;
     this.updateUser(form);
  this.toaster.info('Updated User Sucessfully','Update Profile');
  this.router.navigateByUrl('/user');
   }
   updateUser(form?:NgForm)
   {
 console.log("Updating a Record..");
 this.userservice.UpdateUser(form.value).subscribe(
   (result)=>{
     console.log(form.value);
     console.log(result);
   },
   (error)=>{
     console.log(error);
   }
 );
 
   }

  ngOnInit(): void {
    this.userservice.getUserById(this.id).subscribe((result)=>{
      console.log(result);
      this.userservice.formData=Object.assign({},result);
      this.userservice.formData.Username=result.UserName;
      this.userservice.formData.Userid=result.UserId;
    },
    (error)=>{
      console.log(error);
    });
  }

}
