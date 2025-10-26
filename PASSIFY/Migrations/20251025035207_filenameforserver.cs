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
                name: "EventImageName",
                table: "Activity",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventImageName",
                table: "Activity");
        }
    }
}
