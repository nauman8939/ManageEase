import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  CheckoutProduct(product: any): void {
    const currentItems = this.cartItems.getValue();
    const existingProduct = currentItems.find(item => item.productId === product.productId);

    if (!existingProduct) {
      this.cartItems.next([...currentItems, product]);
    } else {
      // Handle product already in the cart
    }
  }

  getCartItems(): any[] {
    return this.cartItems.getValue();
  }
}
