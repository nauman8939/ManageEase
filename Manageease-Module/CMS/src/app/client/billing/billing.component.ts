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
  //cartItems: any[] = [];
  billingItems: any[]=[];

  constructor(private billingService: BillingService, private receiptService: ReceiptService,private router:Router) {}

  ngOnInit(): void {
    const sessionToken=localStorage.getItem("token");
    if(!sessionToken){
      this.router.navigate(['/login']);
    }
    this.billingService.billingItems$.subscribe((items: any[]) => {
      this.billingItems = items;
    });
  }
  generatePdf(product: any): void {
    const content = `\t\t\t\t\t\t\tManageease\n\n\n\tProduct Name: ${product.productName}\n\tProduct ID: ${product.productId}\n\tProduct Cost:${product.cost}\n\tProduct Information:${product.productInformation}`;
    this.receiptService.generatePdf(content);
  }
}
