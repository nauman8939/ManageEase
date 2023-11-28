import { Component, OnInit } from '@angular/core';
import { BillingService } from './billing.service';
import { ReceiptService } from '../receipt.service';

@Component({
  selector: 'app-billing-tab',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private billingService: BillingService, private receiptService: ReceiptService) {}

  ngOnInit(): void {
    this.billingService.billingItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  generatePdf(product: any): void {
    const content = 'Product Name: ${product.name}\nProduct ID: ${product.id}\nOther Information: ...'; // Add other properties as needed
    this.receiptService.generatePdf(content);
  }
}
