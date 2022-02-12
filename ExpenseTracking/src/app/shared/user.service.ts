import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import{ExpenseCost} from '../shared/expense-cost';
import {WeekReport} from '../shared/week-report';
import{Category} from '../shared/category';
import { Item } from './item';
import { Expense } from './expense';
import { Itemlist } from './itemlist';
import {Expenselist} from './expenselist';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[];
  items:Item[];
  expense:Expense[];
  myExpense:any=[];
  expensecost:ExpenseCost[];
  weekreport:WeekReport[];
  adminuser:User[];
  category:Category[];
  itemlen:number;
  userlen:number;
  explen:number;
  username:string;
  formData:User=new User();
  constructor(private httpClient:HttpClient) { }
  bindListUsers(){
    this.httpClient.get('https://localhost:44382/api/Users').toPromise().then(response=>{
      console.log("From Service");
      console.log(response);
      this.users=response as User[];
      this.userlen=this.users.length+1;
      console.log("Lenght is "+this.userlen);
    })
  }
  UpdateUser(form?:NgForm):Observable<any>
  {
    return this.httpClient.put('https://localhost:44382/api/Users',form);
  }
  DeleteUser(id:number):Observable<any>
  {
    return this.httpClient.delete('https://localhost:44382/api/Users?id='+id);
  }
  AddUser(form?:NgForm):Observable<any>
  {
    return this.httpClient.post('https://localhost:44382/api/Users',form);
  }
 GetItem()
 {
  this.httpClient.get('https://localhost:44382/api/Items').toPromise().then(response=>{
    console.log("From Service");
    console.log(response);
    this.items=response as Item[];
    this.itemlen=this.items.length+1;
 });
 }
  WeekReport()
  {
    this.httpClient.get('https://localhost:44382/api/Expenses/GetWeekReport').toPromise().then(response=>{
      console.log("From Service");
      console.log(response);
      this.weekreport=response as WeekReport[];
     
    }) 
  }

  GetExpenseCost()
  {
    this.httpClient.get('https://localhost:44382/api/Expenses/GetExpenseCost').toPromise().then(response=>{
      console.log("From Service");
      console.log(response);
      this.expensecost=response as ExpenseCost[];
  });
  }
bindExpense()
{
  this.httpClient.get('https://localhost:44382/api/Expenses').toPromise().then(response=>{
    console.log("From Service");
    console.log(response);
    this.expense=response as Expense[];
    this.explen=this.expense.length+1;
});

}
  bindListCategory(){
    this.httpClient.get('https://localhost:44382/api/Category/').toPromise().then(response=>{
      console.log("From Service");
      console.log(response);
      this.category=response as Category[];
    })
  }
  getUserById(id:number):Observable<any>
  {
    return this.httpClient.get('https://localhost:44382/api/Users/'+id);
  }
  addItems(item:Item):Observable<any>
  {
    return this.httpClient.post('https://localhost:44382/api/Items',item);
  }
  addListItem(itemlist:Itemlist):Observable<any>
  {
    return this.httpClient.post('https://localhost:44382/api/Lists',itemlist);
  }
  addExpense(expense:Expense):Observable<any>
  {
    return this.httpClient.post('https://localhost:44382/api/Expenses',expense);
  }
  getExpenseByName():Observable<any>{
     this.username=sessionStorage.getItem("Username");
     return this.httpClient.get('https://localhost:44382/api/Expenses/Username/?name='+this.username);

  }
  }


