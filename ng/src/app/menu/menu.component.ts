import { Component, OnInit, Input } from '@angular/core';

import { SystemService } from '../services/system.service';
import { User } from '../models/User';
import { Menu } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: []
})
export class MenuComponent implements OnInit {

  showMenu: boolean;

  @Input() loggedInUser: User;

	name:string = "Menu Component";

  menus: Menu[] = [
    new Menu("PURCHASE REQUEST SYSTEM", "/home", "System name"),
  	new Menu("HOME", "/home", "Home menu item"),
    new Menu("USERS", "/users", "User list"),
    new Menu("VENDORS", "/vendors", "Vendor list"),
    new Menu("PRODUCTS", "/products", "Product list"),
    new Menu("REQUESTS", "/purchaseRequests", "Purchase Request list"),
    new Menu("REVIEW", "/purchaseRequests/review", "Purchase Request Review"),
    new Menu("ABOUT", "/about", "About menu item"),
    new Menu("LOGIN", "/login", "Login to the app")
  ];

  constructor(private SystemSvc: SystemService) {
  }

  ngOnInit() {
    // this.showMenu = this.SystemSvc.ShowMenu;
  }

}
