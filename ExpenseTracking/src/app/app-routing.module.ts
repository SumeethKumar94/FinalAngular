import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './admin/addusers/addusers.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { ViewusersComponent } from './Admin/viewusers/viewusers.component';
import { LoginComponent } from './login/login.component';
import { AddexpenseComponent } from './Users/addexpense/addexpense.component';
import { EditprofileComponent } from './Users/editprofile/editprofile.component';
import { UsersComponent } from './users/users.component';
// All Paths Defined
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/report',component:ReportsComponent},
  {path:'admin/view',component:ViewusersComponent},
  {path:'admin/adduser',component:AdduserComponent},
  {path:'user',component:UsersComponent},
  {path:'user/editprofile',component:EditprofileComponent},
  {path:'user/addexpense',component:AddexpenseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
