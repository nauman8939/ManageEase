// cart.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { BillingService } from '../billing/billing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private router: Router, private cartService: CartService, private billingService: BillingService) {}
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  checkout(product: any): void {
    this.billingService.CheckoutProduct(product);
  }
}
