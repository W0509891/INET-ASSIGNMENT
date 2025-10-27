using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PASSIFY.Migrations
{
    /// <inheritdoc />
    public partial class nullable_Activity_fks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Category_CategoryId",
                table: "Activity");

            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Organizer_OrganizerId",
                table: "Activity");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizerId",
                table: "Activity",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Activity",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Category_CategoryId",
                table: "Activity",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Organizer_OrganizerId",
                table: "Activity",
                column: "OrganizerId",
                principalTable: "Organizer",
                principalColumn: "OrganizerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Category_CategoryId",
                table: "Activity");

            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Organizer_OrganizerId",
                table: "Activity");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizerId",
                table: "Activity",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Activity",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Category_CategoryId",
                table: "Activity",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Organizer_OrganizerId",
                table: "Activity",
                column: "OrganizerId",
                principalTable: "Organizer",
                principalColumn: "OrganizerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
