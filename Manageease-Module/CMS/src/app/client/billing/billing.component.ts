// billing.component.ts
import { Component, OnInit } from '@angular/core';
import { BillingService } from './billing.service';
import { ReceiptService } from '../receipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-tab',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  billingItems: any[] = [];
  userInfo: any;
  username: string = ''; // Add cashierName property

  constructor(private billingService: BillingService, private receiptService: ReceiptService, private router: Router) {}

  ngOnInit(): void {
    const sessionToken: string = localStorage.getItem('token') ?? ''; // Use nullish coalescing operator

    if (!sessionToken) {
      this.router.navigate(['/login']);
    }

    // Retrieve user information and cashier name from BillingService
    this.userInfo = this.billingService.getUserInfo();
    this.username = this.getCashierNameFromToken(sessionToken);

    // Subscribe to billingItems changes
    this.billingService.billingItems$.subscribe((items: any[]) => {
      this.billingItems = items;
    });
  }

  generatePdf(product: any): void {
    // Add user information to the product for PDF generation
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const content = `
      \t\t\t\t\t\t\tManageEase\n
      \tDate: ${currentDate}\n
      \tTime: ${currentTime}\n
      \tCashier: ${this.username}\n
      \tShop Name: ManageEase\n
      \t-------------------------------------------\n
      \tProduct Name: ${product.productName}\n
      \tProduct ID: ${product.productId}\n
      \tProduct Cost: ${product.cost}\n
      \tProduct Information: ${product.productInformation}\n
      \tUser Name: ${this.userInfo.customerName}\n
      \tPhone Number: ${this.userInfo.phoneNumber}\n
      \tPayment Type: ${this.userInfo.paymentType}\n
    `;

    // Generate PDF with updated content
    this.receiptService.generatePdf(content);
  }

  private getCashierNameFromToken(token: string): string {
    const decodedToken = atob(token.split('.')[1]);
    const parsedToken = JSON.parse(decodedToken);
    return parsedToken.cashierName || 'Unknown Cashier';
  }

  calculateTotal(): number {
    return this.billingItems.reduce((total, item) => total + item.cost, 0);
  }
}
