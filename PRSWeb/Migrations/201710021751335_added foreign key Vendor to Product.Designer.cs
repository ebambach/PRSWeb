// <auto-generated />
namespace PRSWeb.Migrations
{
    using System.CodeDom.Compiler;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Infrastructure;
    using System.Resources;
    
    [GeneratedCode("EntityFramework.Migrations", "6.1.3-40302")]
    public sealed partial class addedforeignkeyVendortoProduct : IMigrationMetadata
    {
        private readonly ResourceManager Resources = new ResourceManager(typeof(addedforeignkeyVendortoProduct));
        
        string IMigrationMetadata.Id
        {
            get { return "201710021751335_added foreign key Vendor to Product"; }
        }
        
        string IMigrationMetadata.Source
        {
            get { return null; }
        }
        
        string IMigrationMetadata.Target
        {
            get { return Resources.GetString("Target"); }
        }
    }
}