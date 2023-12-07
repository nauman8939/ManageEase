import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './client/login/login.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { StationsComponent } from './client/stations/stations.component';
import { CartComponent } from './client/cart/cart.component';
import { BillingComponent } from './client/billing/billing.component';
import { AboutComponent } from './client/about/about.component';
import { SidenavComponent } from './client/sidenav/sidenav.component';
import { ProductjsonComponent } from './client/productjson/productjson.component';
import { CartService } from './client/cart/cart.service';
import { BillingService } from './client/billing/billing.service';
import { DashboardService } from './client/dashboard/dashboardjson.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    StationsComponent,
    CartComponent,
    BillingComponent,
    AboutComponent,
    SidenavComponent,
    ProductjsonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [CartService, BillingService,DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
