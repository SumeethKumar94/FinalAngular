import { Component, OnInit } from '@angular/core';
import {Item} from '../../shared/item';
import {Itemlist} from '../../shared/itemlist';
import {Expense} from '../../shared/expense'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.scss']
})
export class AddexpenseComponent implements OnInit {
  expArray: Array<Item> = [];
  ItemListArray:Array<Itemlist>=[];
  Exp:Array<Expense>=[];
  expo:any={};
  newAttribute:any = {};
  ItemL:any={};
  DefaultCat:number;
  isVisible:boolean=false;
  catVisible:boolean=true;
  buttonDisabled: boolean;
  total:number;
  expdate:Date;
  constructor(public userservice:UserService,private toastr: ToastrService,private router:Router) { }
  hideCategory() {
    this.isVisible = true;
    this.catVisible=false;
  }
  // Add new Items
  addFieldValue() {
    this.buttonDisabled=false;
    console.log("Button Enabled");
   this.newAttribute.ItemId=this.userservice.itemlen+this.expArray.length;  // I didnt use Identity hence auto-generate next PostID
    this.ItemL.ItemlId=this.newAttribute.ItemId+1;
    this.ItemL.ItemId=this.newAttribute.ItemId;
    this.ItemL.ExpId=this.userservice.explen;
    this.ItemListArray.push(this.ItemL)
    this.newAttribute.CatId=Number(this.newAttribute.CatId);
   this.expArray.push(this.newAttribute)
    console.log(this.expArray);
    this.newAttribute = {};
    this.ItemL={};
    console.log(this.newAttribute.CatId);   
}
onSubmit()
{
  console.log('---Items--');
  for(let i=0;i<this.expArray.length;i++)
  this.total+=this.expArray[i].ItemPrice;
 this.expo.ExpId=this.userservice.explen;
 var datepipe=new DatePipe("en-UK");
 let formattedDate:any=datepipe.transform(this.expdate,'yyyy-MM-dd');
 this.expo.ExpenseDate=formattedDate;
 this.expo.TotalExp=this.total;
 this.expo.Userid=+sessionStorage.getItem("UserId");
 this.expo.ItemlId=this.userservice.itemlen+1;
 this.Exp.push(this.expo);
 //Adding Items ,Item Lists and Expense
  for(let i=0;i<this.expArray.length;i++)
 { 
  console.log("Adding Items");
   console.log(this.expArray[i]);
   console.log("--------");
   this.userservice.addItems(this.expArray[i]).subscribe(
    (result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error);
    }
    );
 }
 console.log("Adding Expense");
 console.log(this.Exp[0]);
 console.log("--------");
 this.userservice.addExpense(this.Exp[0]).subscribe(
  (result)=>{
    console.log(result);
  },
  (error)=>{
    console.log(error);
  }
  );
  //Adding Item lists Loop
 for(let k=0;k<this.expArray.length;k++)
 {
   console.log("Adding Item Lists");
  console.log(this.ItemListArray[k]);
  console.log("--------");
  this.userservice.addListItem(this.ItemListArray[k]).subscribe(
    (result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error);
    }
    );
 }
 this.toastr.show("Sucessfully Added all Expenses","Expense Insertion");
 this.router.navigateByUrl('/admin/view');
}
// Delete Field
deleteFieldValue(index) {
    this.expArray.splice(index, 1);
}
  ngOnInit(): void {
    this.buttonDisabled=false;
    this.userservice.bindListCategory();
    this.userservice.GetItem();
    this.userservice.bindExpense();
    this.userservice.explen;
    this.userservice.itemlen;
    this.total=0;
  }
}
