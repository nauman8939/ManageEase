import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  private selectedProduct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedProduct$: Observable<any> = this.selectedProduct.asObservable();

  addToCart(product: any): void {
    this.selectedProduct.next(product);
    const currentItems = this.cartItems.getValue();
    const existingProduct = currentItems.find(item => item.productId === product.productId);
  
    if (!existingProduct) {
      this.cartItems.next([...currentItems, product]);
      Swal.fire('Success', 'Product Added', 'success');
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

    if (currentItems.length === updatedItems.length) {
      Swal.fire('Warning', 'Product Not In Cart', 'error');
    } else {
      this.cartItems.next(updatedItems);
      Swal.fire("Success", "Product Removed", "success");
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  showEmptyCartAlert(): void {
    Swal.fire('Info', 'Your cart is empty.', 'info');
  }
}
