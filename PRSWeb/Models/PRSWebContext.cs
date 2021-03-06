﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PRSWeb.Models
{
    public class PRSWebContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public PRSWebContext() : base("name=PRSWebContext")
        {
        }

		public System.Data.Entity.DbSet<PRSWeb.Models.User> Users { get; set; }

		public System.Data.Entity.DbSet<PRSWeb.Models.Vendor> Vendors { get; set; }

		public System.Data.Entity.DbSet<PRSWeb.Models.Product> Products { get; set; }

		public System.Data.Entity.DbSet<PRSWeb.Models.PurchaseRequest> PurchaseRequests { get; set; }

		public System.Data.Entity.DbSet<PRSWeb.Models.PurchaseRequestLineItem> PurchaseRequestLineItems { get; set; }
	}
}
