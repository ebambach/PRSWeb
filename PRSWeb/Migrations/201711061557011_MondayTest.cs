namespace PRSWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MondayTest : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PurchaseRequests", "RejectionReason", c => c.String(maxLength: 160));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PurchaseRequests", "RejectionReason");
        }
    }
}
