using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace App.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dashboards",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    description = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    viewer = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    formDefinition = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dashboards", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "departments",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_departments", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "emailTemplates",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    notes = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    subject = table.Column<string>(type: "text", nullable: false),
                    message = table.Column<string>(type: "text", nullable: false),
                    category = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    isSystemTemplate = table.Column<bool>(type: "boolean", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emailTemplates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reportDefinitions",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    description = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    reportDefinition = table.Column<string>(type: "text", nullable: false),
                    formDefinition = table.Column<string>(type: "text", nullable: false),
                    parameters = table.Column<string>(type: "text", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    category = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    renderer = table.Column<string>(type: "character varying(32)", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reportDefinitions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    permissions = table.Column<string[]>(type: "text[]", nullable: false),
                    dashboards = table.Column<long[]>(type: "bigint[]", nullable: false),
                    reports = table.Column<long[]>(type: "bigint[]", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "serviceFeeds",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    service = table.Column<string>(type: "text", nullable: false),
                    activity = table.Column<string>(type: "character varying(64)", nullable: false),
                    type = table.Column<string>(type: "character varying(64)", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serviceFeeds", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "smsTemplates",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    notes = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    message = table.Column<string>(type: "text", nullable: false),
                    category = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    isSystemTemplate = table.Column<bool>(type: "boolean", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_smsTemplates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "userStatuses",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    notes = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    isActive = table.Column<bool>(type: "boolean", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userStatuses", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    firstName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    surname = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    staffNumber = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    contactNumber = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    departmentId = table.Column<long>(type: "bigint", nullable: false),
                    statusId = table.Column<long>(type: "bigint", nullable: false),
                    roleId = table.Column<long>(type: "bigint", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    username = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    type = table.Column<string>(type: "character varying(32)", nullable: false),
                    activeDashboardId = table.Column<long>(type: "bigint", nullable: true),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                    table.ForeignKey(
                        name: "FK_users_dashboards_activeDashboardId",
                        column: x => x.activeDashboardId,
                        principalTable: "dashboards",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_users_departments_departmentId",
                        column: x => x.departmentId,
                        principalTable: "departments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_users_roles_roleId",
                        column: x => x.roleId,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_users_userStatuses_statusId",
                        column: x => x.statusId,
                        principalTable: "userStatuses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "queuedReports",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<long>(type: "bigint", nullable: false),
                    reportId = table.Column<long>(type: "bigint", nullable: false),
                    outputFormat = table.Column<string>(type: "character varying(32)", nullable: false),
                    filename = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", nullable: false),
                    filterJson = table.Column<string>(type: "text", nullable: true),
                    notes = table.Column<string>(type: "text", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_queuedReports", x => x.id);
                    table.ForeignKey(
                        name: "FK_queuedReports_reportDefinitions_reportId",
                        column: x => x.reportId,
                        principalTable: "reportDefinitions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_queuedReports_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userFeeds",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<long>(type: "bigint", nullable: false),
                    activity = table.Column<string>(type: "character varying(64)", nullable: false),
                    type = table.Column<string>(type: "character varying(64)", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    entityId = table.Column<long>(type: "bigint", nullable: true),
                    entityType = table.Column<string>(type: "text", nullable: true),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userFeeds", x => x.id);
                    table.ForeignKey(
                        name: "FK_userFeeds_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "queuedReportFeeds",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    requestId = table.Column<long>(type: "bigint", nullable: false),
                    activity = table.Column<string>(type: "character varying(64)", nullable: false),
                    type = table.Column<string>(type: "character varying(64)", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: false),
                    userId = table.Column<long>(type: "bigint", nullable: true),
                    createdBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    createdOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedBy = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    updatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    revision = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_queuedReportFeeds", x => x.id);
                    table.ForeignKey(
                        name: "FK_queuedReportFeeds_queuedReports_requestId",
                        column: x => x.requestId,
                        principalTable: "queuedReports",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_queuedReportFeeds_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_departments_name",
                table: "departments",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_emailTemplates_active",
                table: "emailTemplates",
                column: "active");

            migrationBuilder.CreateIndex(
                name: "IX_emailTemplates_name",
                table: "emailTemplates",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_queuedReportFeeds_requestId",
                table: "queuedReportFeeds",
                column: "requestId");

            migrationBuilder.CreateIndex(
                name: "IX_queuedReportFeeds_userId",
                table: "queuedReportFeeds",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_queuedReports_active",
                table: "queuedReports",
                column: "active");

            migrationBuilder.CreateIndex(
                name: "IX_queuedReports_reportId",
                table: "queuedReports",
                column: "reportId");

            migrationBuilder.CreateIndex(
                name: "IX_queuedReports_status",
                table: "queuedReports",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "IX_queuedReports_userId",
                table: "queuedReports",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_roles_name",
                table: "roles",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_serviceFeeds_service",
                table: "serviceFeeds",
                column: "service");

            migrationBuilder.CreateIndex(
                name: "IX_smsTemplates_active",
                table: "smsTemplates",
                column: "active");

            migrationBuilder.CreateIndex(
                name: "IX_smsTemplates_name",
                table: "smsTemplates",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_userFeeds_userId",
                table: "userFeeds",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_users_activeDashboardId",
                table: "users",
                column: "activeDashboardId");

            migrationBuilder.CreateIndex(
                name: "IX_users_departmentId",
                table: "users",
                column: "departmentId");

            migrationBuilder.CreateIndex(
                name: "IX_users_roleId",
                table: "users",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_users_statusId",
                table: "users",
                column: "statusId");

            migrationBuilder.CreateIndex(
                name: "IX_userStatuses_name",
                table: "userStatuses",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "emailTemplates");

            migrationBuilder.DropTable(
                name: "queuedReportFeeds");

            migrationBuilder.DropTable(
                name: "serviceFeeds");

            migrationBuilder.DropTable(
                name: "smsTemplates");

            migrationBuilder.DropTable(
                name: "userFeeds");

            migrationBuilder.DropTable(
                name: "queuedReports");

            migrationBuilder.DropTable(
                name: "reportDefinitions");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "dashboards");

            migrationBuilder.DropTable(
                name: "departments");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "userStatuses");
        }
    }
}
