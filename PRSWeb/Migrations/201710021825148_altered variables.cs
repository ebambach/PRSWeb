namespace PRSWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alteredvariables : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PurchaseRequests", "Total", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PurchaseRequests", "Total", c => c.String(nullable: false, maxLength: 20));
        }
    }
}
