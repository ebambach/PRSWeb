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
  	new Menu("Home", "/home", "Home menu item"),
    new Menu("Users", "/users", "User list"),
    new Menu("Vendors", "/vendors", "Vendor list"),
    new Menu("Products", "/products", "Product list"),
    new Menu("Requests", "/purchaseRequests", "Purchase Request list"),
    new Menu("About", "/about", "About menu item"),
    new Menu("Login", "/login", "Login to the app")
  ];

  constructor(private SystemSvc: SystemService) {
  }

  ngOnInit() {
  }

}
