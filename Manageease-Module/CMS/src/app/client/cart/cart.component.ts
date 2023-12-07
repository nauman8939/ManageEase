// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from './cart.service';
import { BillingService } from '../billing/billing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  customerName: string = '';
  phoneNumber: string = '';
  paymentType: string = 'cash'; // Default payment type

  constructor(private router: Router, private cartService: CartService, private billingService: BillingService) {}

  ngOnInit(): void {
    const sessionToken = localStorage.getItem("token");
    if (!sessionToken) {
      this.router.navigate(['/login']);
    }

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  checkout(product: any): void {
    Swal.fire({
      title: 'Customer Information',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Customer Name" required>' +
        '<input id="swal-input2" class="swal2-input" placeholder="Phone Number" required>' +
        '<select id="swal-input3" class="swal2-input">' +
        '  <option value="cash">Cash</option>' +
        '  <option value="upi">UPI</option>' +
        '  <option value="card">Card</option>' +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        this.customerName = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        this.phoneNumber = (<HTMLInputElement>document.getElementById('swal-input2')).value;
        this.paymentType = (<HTMLInputElement>document.getElementById('swal-input3')).value;

        this.billingService.addUserInfo({
          customerName: this.customerName,
          phoneNumber: this.phoneNumber,
          paymentType: this.paymentType
        });

        this.billingService.checkoutProduct(this.cartItems[0]);
        Swal.fire('Success', 'All products successfully billed. Please visit the billing section for the receipt.', 'success');
        this.cartService.clearCart();
      }
    });
      
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.cost, 0);
  }

  removeFromCart(product: any): void {
    const updatedItems = this.cartItems.filter(item => item.productId !== product.productId);
    this.cartService.removeFromCart(product);
  }

  checkoutAll(): void {
    Swal.fire({
      title: 'Customer Information',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Customer Name" required>' +
        '<input id="swal-input2" class="swal2-input" placeholder="Phone Number" required>' +
        '<select id="swal-input3" class="swal2-input">' +
        '  <option value="cash">Cash</option>' +
        '  <option value="upi">UPI</option>' +
        '  <option value="card">Card</option>' +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        this.customerName = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        this.phoneNumber = (<HTMLInputElement>document.getElementById('swal-input2')).value;
        this.paymentType = (<HTMLInputElement>document.getElementById('swal-input3')).value;
  
        this.billingService.addUserInfo({
          customerName: this.customerName,
          phoneNumber: this.phoneNumber,
          paymentType: this.paymentType
        });
  
        // Iterate over each item in the cart and checkout
        this.cartItems.forEach(item => {
          this.billingService.checkoutProduct(item);
        });
  
        Swal.fire('Success', 'All products successfully billed. Please visit the billing section for the receipt.', 'success');
        this.cartService.clearCart();
      }
    });
  }
  
}
