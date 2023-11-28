import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StationsComponent } from '../stations/stations.component';
//import { SidenavComponent } from '../sidenav/sidenav.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})

export class SidenavComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    const sessionToken=localStorage.getItem("token");
    if(!sessionToken){
      this.router.navigate(['/login']);
    }
  }
}


