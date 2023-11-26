import { Component, OnInit } from '@angular/core';
import { JsonService } from './json.service';
import { CartService } from '../cart/cart.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-json',
  templateUrl: './productjson.component.html',
  styleUrls: ['./productjson.component.css']
})
export class ProductjsonComponent implements OnInit {
  jsonData: any[] = [];

  constructor(private jsonService: JsonService, @Inject(CartService) private cartService: CartService) {}

  ngOnInit(): void {
    this.jsonService.getJsonData().subscribe(data => {
      this.jsonData = data;
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
  }
}
