import { Component, OnInit } from '@angular/core';

import {Menu} from './menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	name = "This looks like a good spot for a menu";
	hello = "Hello, Angular!"
	
	menus:Menu[] = [
	//new Menu("What the button says(the display)", 
	//"What the link says when you hover over it with the mouse(also the href),"
	//and the tooltip)
	new Menu("Home", "/Home", "Home menu item"),
	new Menu("Users", "/Users", "Users menu item"),
	new Menu("Vendor", "/Vendor", "Vendor menu item"),
	new Menu("Product", "/Product", "Product menu item"),
	new Menu("Request", "/Request", "Request menu item"),
	new Menu("Review", "/Review", "Review menu item"),
	new Menu("About", "/About", "About menu item"),
	new Menu("Login", "/Login", "Login to the app")
	];

  constructor() { }

  ngOnInit() {
  }

}
