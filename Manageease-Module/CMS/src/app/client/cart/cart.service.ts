import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  addToCart(product: any): void {
    const currentItems = this.cartItems.getValue();
    
    const existingProduct = currentItems.find(item => item.productId === product.productId);

    if (!existingProduct) {
      this.cartItems.next([...currentItems, product]);
    } else {
      Swal.fire('Warning', 'Product Already Added In Cart', 'warning');
    }
  }
  getCartItems(): any[] {
    return this.cartItems.getValue();
  }
  removeFromCart(product: any): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.productId !== product.productId);
    this.cartItems.next(updatedItems);
  }

}