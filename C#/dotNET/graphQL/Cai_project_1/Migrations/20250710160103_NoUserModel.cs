using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App.Migrations
{
    /// <inheritdoc />
    public partial class NoUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_queuedReportFeeds_User_userId",
                table: "queuedReportFeeds");

            migrationBuilder.DropForeignKey(
                name: "FK_queuedReports_User_userId",
                table: "queuedReports");

            migrationBuilder.DropForeignKey(
                name: "FK_User_dashboards_activeDashboardId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_departments_departmentId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_roles_roleId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_userStatuses_statusId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_userFeeds_User_userId",
                table: "userFeeds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "users");

            migrationBuilder.RenameIndex(
                name: "IX_User_statusId",
                table: "users",
                newName: "IX_users_statusId");

            migrationBuilder.RenameIndex(
                name: "IX_User_roleId",
                table: "users",
                newName: "IX_users_roleId");

            migrationBuilder.RenameIndex(
                name: "IX_User_departmentId",
                table: "users",
                newName: "IX_users_departmentId");

            migrationBuilder.RenameIndex(
                name: "IX_User_activeDashboardId",
                table: "users",
                newName: "IX_users_activeDashboardId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_queuedReportFeeds_users_userId",
                table: "queuedReportFeeds",
                column: "userId",
                principalTable: "users",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_queuedReports_users_userId",
                table: "queuedReports",
                column: "userId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_userFeeds_users_userId",
                table: "userFeeds",
                column: "userId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_users_dashboards_activeDashboardId",
                table: "users",
                column: "activeDashboardId",
                principalTable: "dashboards",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_users_departments_departmentId",
                table: "users",
                column: "departmentId",
                principalTable: "departments",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_users_roles_roleId",
                table: "users",
                column: "roleId",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_users_userStatuses_statusId",
                table: "users",
                column: "statusId",
                principalTable: "userStatuses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_queuedReportFeeds_users_userId",
                table: "queuedReportFeeds");

            migrationBuilder.DropForeignKey(
                name: "FK_queuedReports_users_userId",
                table: "queuedReports");

            migrationBuilder.DropForeignKey(
                name: "FK_userFeeds_users_userId",
                table: "userFeeds");

            migrationBuilder.DropForeignKey(
                name: "FK_users_dashboards_activeDashboardId",
                table: "users");

            migrationBuilder.DropForeignKey(
                name: "FK_users_departments_departmentId",
                table: "users");

            migrationBuilder.DropForeignKey(
                name: "FK_users_roles_roleId",
                table: "users");

            migrationBuilder.DropForeignKey(
                name: "FK_users_userStatuses_statusId",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "User");

            migrationBuilder.RenameIndex(
                name: "IX_users_statusId",
                table: "User",
                newName: "IX_User_statusId");

            migrationBuilder.RenameIndex(
                name: "IX_users_roleId",
                table: "User",
                newName: "IX_User_roleId");

            migrationBuilder.RenameIndex(
                name: "IX_users_departmentId",
                table: "User",
                newName: "IX_User_departmentId");

            migrationBuilder.RenameIndex(
                name: "IX_users_activeDashboardId",
                table: "User",
                newName: "IX_User_activeDashboardId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_queuedReportFeeds_User_userId",
                table: "queuedReportFeeds",
                column: "userId",
                principalTable: "User",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_queuedReports_User_userId",
                table: "queuedReports",
                column: "userId",
                principalTable: "User",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_dashboards_activeDashboardId",
                table: "User",
                column: "activeDashboardId",
                principalTable: "dashboards",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_departments_departmentId",
                table: "User",
                column: "departmentId",
                principalTable: "departments",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_roles_roleId",
                table: "User",
                column: "roleId",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_userStatuses_statusId",
                table: "User",
                column: "statusId",
                principalTable: "userStatuses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_userFeeds_User_userId",
                table: "userFeeds",
                column: "userId",
                principalTable: "User",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
