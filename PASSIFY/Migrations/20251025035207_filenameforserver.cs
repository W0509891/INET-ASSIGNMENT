using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PASSIFY.Migrations
{
    /// <inheritdoc />
    public partial class filenameforserver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Activity",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Activity");
        }
    }
}
