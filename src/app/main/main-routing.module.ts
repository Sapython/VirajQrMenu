import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MainComponent } from './main.component';
import { MenuComponent } from './menu/menu.component';
import { PlacedComponent } from './placed/placed.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  {
    path: ':project',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'splash',
        pathMatch: 'full',
      },
      {
        path: 'splash',
        component: SplashComponent,
        data: { animation: 'isLeft' },
      },
      {
        path: 'menu',
        component: MenuComponent,
        data: { animation: 'isRight' },
      },
      {
        path: 'placed',
        component: PlacedComponent,
        data: { animation: 'isRight' },
      },
      {
        path: 'customerDetail',
        component:CustomerDetailComponent,
        data: { animation: 'isRight' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
