import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
hobbyname:string;
  constructor(public userservice:UserService,private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userservice.GetExpenseCost();
    this.userservice.WeekReport();
  }

}
