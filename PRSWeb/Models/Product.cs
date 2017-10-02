using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace PRSWeb.Models {
	public class Product {
		public int Id { get; set; }

		[StringLength(50)]
		[Required]
		public string VendorPartNumber { get; set; }

		[StringLength(50)]
		[Required]
		public string Name { get; set; }

		[Required]
		public double Price { get; set; }

		[StringLength(30)]
		[Required]
		public string Unit { get; set; }

		[StringLength(130)]
		public string Photopath { get; set; }

		public int VendorId { get; set; }
		public Vendor Vendor { get; set; }
	}
}