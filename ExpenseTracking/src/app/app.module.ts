import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {AuthGuard} from './shared/auth.guard';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {AuthInterceptor} from './shared/auth.interceptor'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {UserService} from './shared/user.service';
import { ViewusersComponent } from './Admin/viewusers/viewusers.component';
import { AdduserComponent } from './admin/addusers/addusers.component';
import { UsersComponent } from './users/users.component';
import { EditprofileComponent } from './Users/editprofile/editprofile.component';
import { AddexpenseComponent } from './Users/addexpense/addexpense.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ReportsComponent,
    ViewusersComponent,
    AdduserComponent,
    UsersComponent,
    EditprofileComponent,
    AddexpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
   FormsModule,
   Ng2SearchPipeModule,
   BrowserAnimationsModule,
   CommonModule,
   ToastrModule.forRoot() 
  ],
  providers: [UserService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
