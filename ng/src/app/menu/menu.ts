//This file will act as the "Model" for the menu.
export class Menu{
	display:string;
	href:string;
	tooltip:string;

	//The constructor below will take the strings that are passed
	//to it in order to define display, href, and tooltip.
	constructor(display:string, href:string, tooltip:string){
		this.display = display;
		this.href = href;
		this.tooltip = tooltip;
	}
}
	