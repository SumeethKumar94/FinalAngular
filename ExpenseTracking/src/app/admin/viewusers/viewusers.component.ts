import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})
export class ViewusersComponent implements OnInit {
filter:string;
page:number;
  constructor(public userservice:UserService,private authservice:AuthService,private router:Router) { }
btn()
{
 this.router.navigateByUrl('/admin/add');
}
deleteUser(user:number)
{
  console.log(user);
  if(confirm("Do you want to Delete ?  Userid:"+user))
  {
  this.userservice.DeleteUser(user).subscribe(
    response=>{this.userservice.bindListUsers();},
    error=>{console.log(error);
  } );
}
}
  ngOnInit(): void {
    this.userservice.bindListUsers();

  }

}
