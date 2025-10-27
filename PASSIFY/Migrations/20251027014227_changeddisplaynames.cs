using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PASSIFY.Migrations
{
    /// <inheritdoc />
    public partial class changeddisplaynames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EventImageName",
                table: "Activity");

            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Activity",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Activity");

            migrationBuilder.AddColumn<string>(
                name: "EventImageName",
                table: "Activity",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
