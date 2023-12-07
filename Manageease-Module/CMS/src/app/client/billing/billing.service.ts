// billing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public billingItems$ = this.billingItems.asObservable();
  private userInfo: any;

  constructor(private router: Router) {}

  addUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  checkoutProduct(product: any): void {
    const currentItems = this.billingItems.getValue() || [];
    this.billingItems.next([...currentItems, { ...product, userInfo: this.userInfo }]);
    this.router.navigate(['/billing']);
  }
}
