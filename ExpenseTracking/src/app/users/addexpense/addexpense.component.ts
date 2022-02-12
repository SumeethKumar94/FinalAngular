import { Component, OnInit } from '@angular/core';
import {Item} from '../../shared/item';
import {Itemlist} from '../../shared/itemlist';
import {Expense} from '../../shared/expense'

import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { DatePipe } from '@angular/common';

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
  Catvisible:boolean=true;
  buttonDisabled: boolean;
  total:number;
  expdate:Date;
  constructor(public userservice:UserService,private toastr: ToastrService) { }
  hideCategory() {
    this.isVisible = true;
    this.Catvisible=false;
  }
  
  addFieldValue() {
    this.buttonDisabled=false;
    console.log("Button Enabled");
   this.newAttribute.Item_id=this.userservice.itemlen+this.expArray.length;  // I didnt use Identity hence auto-generate next PostID
    this.ItemL.Iteml_id=this.newAttribute.Item_id+1;
    this.ItemL.Item_id=this.newAttribute.Item_id;
    this.ItemL.exp_id=this.userservice.explen;
    this.ItemListArray.push(this.ItemL)
    this.newAttribute.Cat_id=Number(this.newAttribute.Cat_id);
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
  this.total+=this.expArray[i].Item_price;
 this.expo.Exp_id=this.userservice.explen;
 var datepipe=new DatePipe("en-UK");
 let formattedDate:any=datepipe.transform(this.expdate,'yyyy-MM-dd');
 this.expo.Expense_date=formattedDate;
 this.expo.Total_exp=this.total;
 this.expo.User_id=+sessionStorage.getItem("UserId");
 this.expo.Iteml_id=this.userservice.itemlen+1;
 this.Exp.push(this.expo);
 //console.log(this.Exp[0]);

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
 //this.resetForm(); 
}

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
