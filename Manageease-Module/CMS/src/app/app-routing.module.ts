// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { StationsComponent } from './client/stations/stations.component';
import { BillingComponent } from './client/billing/billing.component';
import { AboutComponent } from './client/about/about.component';
import { CartComponent } from './client/cart/cart.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'stations', component: StationsComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  //{ path: 'component2', component: Component2Component },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
