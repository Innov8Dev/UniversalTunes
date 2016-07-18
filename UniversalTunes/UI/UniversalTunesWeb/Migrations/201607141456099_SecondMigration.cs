namespace UniversalTunesWeb.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SecondMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Uid = c.String(),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AspNetUsers", "UserType_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "UserType_Id");
            AddForeignKey("dbo.AspNetUsers", "UserType_Id", "dbo.UserTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "UserType_Id", "dbo.UserTypes");
            DropIndex("dbo.AspNetUsers", new[] { "UserType_Id" });
            DropColumn("dbo.AspNetUsers", "UserType_Id");
            DropTable("dbo.UserTypes");
        }
    }
}
