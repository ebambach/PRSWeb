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
					IsReviewer = true, IsAdmin = true }
			);
        }
    }
}
