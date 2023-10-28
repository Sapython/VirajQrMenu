import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  cartItems:number = 0;
  constructor(public dataProvider:DataProvider,private router:Router,private alertify:AlertsAndNotificationsService) { }
  customerDetailForm:FormGroup = new FormGroup({
    name: new FormControl(localStorage.getItem('name'),[Validators.required]),
    email: new FormControl(localStorage.getItem('email'),[Validators.required,Validators.email]),
    phone: new FormControl(localStorage.getItem('phone'),[Validators.required,Validators.pattern('^[0-9]*$')]),
    notes: new FormControl(localStorage.getItem('notes')),
  })
  showOrderDescription:boolean = false;
  finalProducts:any[] = [];
  finalSum:number = 0;
  ngOnInit(): void {
    console.log(this.dataProvider.qrProducts)
    this.dataProvider.qrProducts.forEach((item)=>{
      this.finalSum += item.onlinePrice * item.quantity;
      this.cartItems += 1;
    })
    console.log("finalProducts",this.finalProducts)
  }
  confirmOrder(){
    console.log(this.customerDetailForm.value);
    if (!this.showOrderDescription){
      localStorage.setItem('name',this.customerDetailForm.value.name);
      localStorage.setItem('email',this.customerDetailForm.value.email);
      localStorage.setItem('phone',this.customerDetailForm.value.phone);
      localStorage.setItem('notes',this.customerDetailForm.value.notes);
      localStorage.setItem('cartItems',this.cartItems.toString());
      localStorage.setItem('products',JSON.stringify(this.dataProvider.qrProducts))
      this.dataProvider.qrCustomerData = this.customerDetailForm.value;
      if (this.customerDetailForm.valid){
        this.router.navigate([this.dataProvider.currentProjectId,'placed'],{queryParams:{table:this.dataProvider.currentTable}});
        this.showOrderDescription = true;
      } else {
        this.alertify.presentToast('Please fill all the fields')
      }
    } else {
      this.router.navigate([this.dataProvider.currentProjectId,'placed'],{queryParams:{table:this.dataProvider.currentTable}});
    }
  }

  removeFromCart(item:any){
    this.dataProvider.qrProducts.splice(this.dataProvider.qrProducts.indexOf(item),1);
  }


}
