﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Initialization;
using System;

namespace MtgCoreLib.Migrations
{
    [DbContext(typeof(MtgCoreLibContext))]
    partial class MtgCoreLibContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MtgCoreLib.Entities.Cards.Card", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConvertedManaCost");

                    b.Property<string>("ManaCost");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("OracleText");

                    b.Property<string>("Power");

                    b.Property<string>("Toughness");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Cards.CardOtherInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Foil");

                    b.Property<bool>("Promo");

                    b.HasKey("Id");

                    b.ToTable("CardOtherInfos");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Cards.CardSetInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Artist")
                        .IsRequired();

                    b.Property<int>("CardId");

                    b.Property<string>("Num");

                    b.Property<int>("Rarity");

                    b.Property<int>("SetId");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("SetId");

                    b.ToTable("CardSetInfos");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Cards.Set", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Sets");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Collections.Collection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int?>("ParentId");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Collections.CollectionCardLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CardOtherInfoId");

                    b.Property<int>("CardSetInfoId");

                    b.Property<int>("CollectionId");

                    b.HasKey("Id");

                    b.HasIndex("CardOtherInfoId");

                    b.HasIndex("CardSetInfoId");

                    b.HasIndex("CollectionId");

                    b.ToTable("CollectionCardLinks");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Other.Format", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Formats");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Cards.CardSetInfo", b =>
                {
                    b.HasOne("MtgCoreLib.Entities.Cards.Card", "Card")
                        .WithMany("CardSetInfos")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCoreLib.Entities.Cards.Set", "Set")
                        .WithMany("CardSetInfos")
                        .HasForeignKey("SetId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Collections.Collection", b =>
                {
                    b.HasOne("MtgCoreLib.Entities.Collections.Collection", "Parent")
                        .WithMany("SubCollections")
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("MtgCoreLib.Entities.Collections.CollectionCardLink", b =>
                {
                    b.HasOne("MtgCoreLib.Entities.Cards.CardOtherInfo", "CardOtherInfo")
                        .WithMany()
                        .HasForeignKey("CardOtherInfoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCoreLib.Entities.Cards.CardSetInfo", "CardSetInfo")
                        .WithMany("CollectionCardLinks")
                        .HasForeignKey("CardSetInfoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCoreLib.Entities.Collections.Collection", "Collection")
                        .WithMany("CollectionCardLinks")
                        .HasForeignKey("CollectionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
