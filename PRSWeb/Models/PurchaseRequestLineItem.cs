﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRSWeb.Models {
	public class PurchaseRequestLineItem {
		public int Id { get; set; }
		public int PurchaseRequestId { get; set; }
		public int ProductId { get; set; }
		public int Quantity { get; set; }
	}
}