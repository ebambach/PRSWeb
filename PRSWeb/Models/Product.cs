using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace PRSWeb.Models {
	public class Product {
		public int Id { get; set; }
		public int VendorId { get; set; }
		public string VendorPartNumber { get; set; }
		public string Name { get; set; }
		public double Price { get; set; }
		public string Unit { get; set; }
		public string Photopath { get; set; }
	}
}