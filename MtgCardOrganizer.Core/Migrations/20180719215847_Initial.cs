using Microsoft.EntityFrameworkCore.Migrations;

namespace MtgCardOrganizer.Core.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CardOtherInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Foil = table.Column<bool>(nullable: false),
                    Promo = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardOtherInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    ManaCost = table.Column<string>(nullable: true),
                    ConvertedManaCost = table.Column<string>(nullable: true),
                    Power = table.Column<string>(nullable: true),
                    Toughness = table.Column<string>(nullable: true),
                    OracleText = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    ParentId = table.Column<int>(nullable: true),
                    IsPublic = table.Column<bool>(nullable: false),
                    OwnerUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Collections_Collections_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Formats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CollectionUserLinks",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    CollectionId = table.Column<int>(nullable: false),
                    Permission = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionUserLinks", x => new { x.UserId, x.CollectionId });
                    table.UniqueConstraint("AK_CollectionUserLinks_CollectionId_UserId", x => new { x.CollectionId, x.UserId });
                    table.ForeignKey(
                        name: "FK_CollectionUserLinks_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CardSetInfos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CardId = table.Column<int>(nullable: false),
                    Artist = table.Column<string>(nullable: false),
                    Num = table.Column<string>(nullable: true),
                    Rarity = table.Column<int>(nullable: false),
                    SetId = table.Column<int>(nullable: false),
                    MultiverseId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardSetInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardSetInfos_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardSetInfos_Sets_SetId",
                        column: x => x.SetId,
                        principalTable: "Sets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CollectionCardLinks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CollectionId = table.Column<int>(nullable: false),
                    CardSetInfoId = table.Column<int>(nullable: false),
                    CardOtherInfoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionCardLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CollectionCardLinks_CardOtherInfos_CardOtherInfoId",
                        column: x => x.CardOtherInfoId,
                        principalTable: "CardOtherInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CollectionCardLinks_CardSetInfos_CardSetInfoId",
                        column: x => x.CardSetInfoId,
                        principalTable: "CardSetInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CollectionCardLinks_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardSetInfos_CardId",
                table: "CardSetInfos",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_CardSetInfos_SetId",
                table: "CardSetInfos",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionCardLinks_CardOtherInfoId",
                table: "CollectionCardLinks",
                column: "CardOtherInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionCardLinks_CardSetInfoId",
                table: "CollectionCardLinks",
                column: "CardSetInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionCardLinks_CollectionId",
                table: "CollectionCardLinks",
                column: "CollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Collections_ParentId",
                table: "Collections",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CollectionCardLinks");

            migrationBuilder.DropTable(
                name: "CollectionUserLinks");

            migrationBuilder.DropTable(
                name: "Formats");

            migrationBuilder.DropTable(
                name: "CardOtherInfos");

            migrationBuilder.DropTable(
                name: "CardSetInfos");

            migrationBuilder.DropTable(
                name: "Collections");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "Sets");
        }
    }
}
