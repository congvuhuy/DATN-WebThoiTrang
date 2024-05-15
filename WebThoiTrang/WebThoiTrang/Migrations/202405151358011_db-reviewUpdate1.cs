namespace WebThoiTrang.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbreviewUpdate1 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.tb_ReviewProduct", newName: "tb_Review");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.tb_Review", newName: "tb_ReviewProduct");
        }
    }
}
