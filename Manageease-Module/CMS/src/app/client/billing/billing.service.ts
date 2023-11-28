import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public billingItems$ = this.billingItems.asObservable();

  constructor(private router: Router) {}

  CheckoutProduct(product: any): void {
    const currentItems = this.billingItems.getValue();
    const existingProduct = currentItems.find((item) => item.productId === product.productId);
  
      this.billingItems.next([...currentItems, product]);
      this.router.navigate(['/billing']);
  }
  
  
}
