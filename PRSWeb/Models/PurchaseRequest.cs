using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace PRSWeb.Models {
	public class PurchaseRequest {
		public int Id { get; set; }

		[StringLength(80)]
		[Required]
		public string Description { get; set; }

		[StringLength(160)]
		[Required]
		public string Justification { get; set; }

		[Required]
		public DateTime DateNeeded { get; set; }

		[StringLength(30)]
		[Required]
		public string DeliveryMode { get; set; }

		[StringLength(30)]
		[Required]
		public string Status { get; set; }

		[Required]
		public double Total { get; set; }

		[Required]
		public DateTime SubmittedDate { get; set; }

		public int UserId { get; set; }
		public virtual User User { get; set; }
	}
}