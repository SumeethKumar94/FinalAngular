import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatePipe } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  pages:number=1;
  filter:string;
  user:string;
  myExpenses:any;
  constructor(public userservice:UserService,private authservice:AuthService,private router:Router,private toaster:ToastrService) { }
  ngOnInit(): void {
    this.user=sessionStorage.getItem("Username");
    this.userservice.getExpenseByName().subscribe(
      (result)=>{
        this.myExpenses=Array.of(result);
        console.log(result);
        console.log("From Component");
        console.log(this.myExpenses);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  logout()
  {
    sessionStorage.setItem("Username","");
    sessionStorage.setItem("Token","");
    sessionStorage.setItem("UserId","");
    this.router.navigateByUrl("/");
  }

}
