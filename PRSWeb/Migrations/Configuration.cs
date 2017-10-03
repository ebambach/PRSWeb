namespace PRSWeb.Migrations
{
	using PRSWeb.Models;
	using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PRSWeb.Models.PRSWebContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

		protected override void Seed(PRSWeb.Models.PRSWebContext context)
        {
			//  This method will be called after migrating to the latest version.

			//  You can use the DbSet<T>.AddOrUpdate() helper extension method 
			//  to avoid creating duplicate seed data. E.g.
			//
			//    context.People.AddOrUpdate(
			//      p => p.FullName,
			//      new Person { FullName = "Andrew Peters" },
			//      new Person { FullName = "Brice Lambson" },
			//      new Person { FullName = "Rowan Miller" }
			//    );
			//

			context.Users.AddOrUpdate(
				u => u.UserName,
				new User { UserName = "admin", Password = "admin",
					FirstName = "System", LastName = "Admin",
					Phone = "555-867-5309", Email = "system@admin.com",
					IsReviewer = true, IsAdmin = true },
				
				new User {
					UserName = "user",
					Password = "user",
					FirstName = "Normal",
					LastName = "User",
					Phone = "555-482-9712",
					Email = "normal@user.com",
					IsReviewer = false,
					IsAdmin = false
				}
			);

			context.Vendors.AddOrUpdate(
				v => v.Name,
				new Vendor {
					Code = "AAPL",
					Name = "Apple",
					Address = "1 Infinite Loop",
					City = "Cupertino",
					State = "CA",
					Zip = "95014",
					Phone = "408-974–2042",
					Email = "info@apple.com",
					PreApproved = true
				},
				new Vendor {
					Code = "GOOGL",
					Name = "Google",
					Address = "1600 Amphitheatre Parkway",
					City = "Mountain View",
					State = "CA",
					Zip = "94043",
					Phone = "877-355-5787",
					Email = "info@google.com",
					PreApproved = true
				},
				new Vendor {
					Code = "MSFT",
					Name = "Microsoft",
					Address = "1 Microsoft Way",
					City = "Redmond",
					State = "WA",
					Zip = "98052",
					Phone = "425-882-8080",
					Email = "info@microsoft.com",
					PreApproved = true
				}
			);

			context.Products.AddOrUpdate(
				p => p.Name,
				new Product {
					VendorPartNumber = "A1534",
					Name = "Macbook",
					Price = 1299.00,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/macbook.jpg",
					VendorId = 1
				},
				new Product {
					VendorPartNumber = "A1842",
					Name = "Apple TV 32GB",
					Price = 149.00,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/appletv.jpg",
					VendorId = 1
				},
				new Product {
					VendorPartNumber = "A1863",
					Name = "IPhone 8 64GB",
					Price = 1299.00,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/iphone8.jpg",
					VendorId = 1
				},

				new Product {
					VendorPartNumber = "XE510C24-K01US",
					Name = "Samsung Chromebook Pro",
					Price = 499.99,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/samsungchrome.jpg",
					VendorId = 2
				},
				new Product {
					VendorPartNumber = "GSB",
					Name = "G Suite Business (monthly charge)",
					Price = 10.00,
					Unit = "Digital service",
					Photopath = "C:/repos/PRSWeb/images/gsuite.jpg",
					VendorId = 2
				},
				new Product {
					VendorPartNumber = "G-2PW2100",
					Name = "Pixel",
					Price = 649.00,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/pixel.jpg",
					VendorId = 2
				},

				new Product {
					VendorPartNumber = "1796",
					Name = "Surface Pro",
					Price = 799.00,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/surfacepro.jpg",
					VendorId = 3
				},
				new Product {
					VendorPartNumber = "W10H",
					Name = "Windows 10 Home",
					Price = 119.99,
					Unit = "Digital download",
					Photopath = "C:/repos/PRSWeb/images/windows10.jpg",
					VendorId = 3
				},
				new Product {
					VendorPartNumber = "One M8",
					Name = "HTC One M8 for Windows, Gunmetal Grey 32GB",
					Price = 158.95,
					Unit = "Box",
					Photopath = "C:/repos/PRSWeb/images/oneM8.png",
					VendorId = 3
				}
			);
		}
    }
}
