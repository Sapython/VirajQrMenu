import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    public dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private router:Router
  ) {}
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  ngOnInit(): void {
    this.dataProvider.dbProducts.forEach((doc) => {
      this.products.push({ ...doc.data(), id: doc.id });
        // if !(this.categories.includes(doc.data().categories.id))
        this.categories.filter(
          (category: any) => category.id == doc.data().categories?.id
        ).length == 0
          ? (doc.data().categories ? this.categories.push(doc.data().categories) : {})
          : null;
        console.log(doc.data().categories)
    })
  }

  filterRecipes(category: string) {
    return this.products.filter(
      (product: any) => {
        if (product.categories){
          return product.categories.id == category
        } else {
          return false;
        }
      }
    );
  }

  filterDishes(event:any){
    const options = {
      keys: ['dishName', 'sellingPrice', 'onlinePrice'],
    };
    const fuse = new Fuse(this.products, options); // "list" is the item array
    const result = fuse.search(event.target.value);
    this.filteredProducts = [];
    result.forEach((product: any) => {
      this.filteredProducts.push(product.item);
    });
  }

  addToCart(product:any) {
    // this.dataProvider.qrProducts.push(product);
    // check if product already exists in cart and if it does, increase the quantity by 1 else add it to cart
    let productIndex = this.dataProvider.qrProducts.findIndex(
      (item: any) => item.id == product.id
    );
    if (productIndex == -1) {
      this.dataProvider.qrProducts.push({ ...product, quantity: 1 });
    } else {
      this.dataProvider.qrProducts[productIndex].quantity++;
    }
    this.alertify.presentToast('Added to cart');
  }

  continueToCheckout() {
    if (this.dataProvider.qrProducts.length == 0) {
      this.alertify.presentToast('Please add some products to cart');
      return;
    }
    this.router.navigate([this.dataProvider.currentProjectId,'customerDetail'],{queryParams:{table:this.dataProvider.currentTable}});
  }
}
