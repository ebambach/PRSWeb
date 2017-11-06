namespace PRSWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedPurchaseRequestandPurchaseRequestLineItemscontrollers : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VendorPartNumber = c.String(nullable: false, maxLength: 50),
                        Name = c.String(nullable: false, maxLength: 50),
                        Price = c.Double(nullable: false),
                        Unit = c.String(nullable: false, maxLength: 30),
                        Photopath = c.String(maxLength: 130),
                        VendorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Vendors", t => t.VendorId, cascadeDelete: true)
                .Index(t => t.VendorId);
            
            CreateTable(
                "dbo.PurchaseRequestLineItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        PurchaseRequestId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.PurchaseRequests", t => t.PurchaseRequestId, cascadeDelete: true)
                .Index(t => t.PurchaseRequestId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.PurchaseRequests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false, maxLength: 80),
                        Justification = c.String(nullable: false, maxLength: 160),
						RejectionReason = c.String(nullable: true, maxLength: 160),
						DateNeeded = c.DateTime(nullable: false),
                        DeliveryMode = c.String(nullable: false, maxLength: 30),
                        Status = c.String(nullable: false, maxLength: 30),
                        Total = c.String(nullable: false, maxLength: 20),
                        SubmittedDate = c.DateTime(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PurchaseRequestLineItems", "PurchaseRequestId", "dbo.PurchaseRequests");
            DropForeignKey("dbo.PurchaseRequests", "UserId", "dbo.Users");
            DropForeignKey("dbo.PurchaseRequestLineItems", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Products", "VendorId", "dbo.Vendors");
            DropIndex("dbo.PurchaseRequests", new[] { "UserId" });
            DropIndex("dbo.PurchaseRequestLineItems", new[] { "ProductId" });
            DropIndex("dbo.PurchaseRequestLineItems", new[] { "PurchaseRequestId" });
            DropIndex("dbo.Products", new[] { "VendorId" });
            DropTable("dbo.PurchaseRequests");
            DropTable("dbo.PurchaseRequestLineItems");
            DropTable("dbo.Products");
        }
    }
}
