using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRSWeb.Models {
	public class PurchaseRequest {
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Description { get; set; }
		public string Justification { get; set; }
		public DateTime DateNeeded { get; set; }
		public string DeliveryMode { get; set; }
		public string Status { get; set; }
		public string Total { get; set; }
		public DateTime SubmittedDate { get; set; }
	}
}