import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public billingItems$ = this.billingItems.asObservable();

  constructor(private cartService: CartService) {
    this.cartService.selectedProduct$.subscribe((selectedProduct) => {
      if (selectedProduct) {
        this.CheckoutProduct(selectedProduct);
      }
    });
  }

  CheckoutProduct(product: any): void {
    const currentItems = this.billingItems.getValue();
    const existingProduct = currentItems.find((item) => item.productId === product.productId);

    if (!existingProduct) {
      this.billingItems.next([...currentItems, product]);
    } else {
      // Handle existing product case...
    }
  }
}
