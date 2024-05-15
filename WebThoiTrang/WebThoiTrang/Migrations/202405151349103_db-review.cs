namespace WebThoiTrang.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbreview : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.tb_ReviewProduct",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        UserName = c.String(),
                        FullName = c.String(),
                        Email = c.String(),
                        Content = c.String(),
                        Rate = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        Avatar = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.tb_ReviewProduct");
        }
    }
}
