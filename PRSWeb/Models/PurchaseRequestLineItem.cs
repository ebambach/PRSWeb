using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace PRSWeb.Models {
	public class PurchaseRequestLineItem {
		public int Id { get; set; }

		[Required]
		public int Quantity { get; set; }
		
		public int PurchaseRequestId { get; set; }
		public PurchaseRequest PurchaseRequest { get; set; }

		public int ProductId { get; set; }
		public virtual Product Product { get; set; }
	}
}