import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LottieModule } from 'ngx-lottie';
import { SplashComponent } from './splash/splash.component';
import { PlacedComponent } from './placed/placed.component';
import { MenuComponent } from './menu/menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    SplashComponent,
    PlacedComponent,
    MenuComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LottieModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule { }
