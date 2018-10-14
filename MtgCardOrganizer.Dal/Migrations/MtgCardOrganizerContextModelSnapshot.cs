﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MtgCardOrganizer.Dal.Initialization;

namespace MtgCardOrganizer.Dal.Migrations
{
    [DbContext(typeof(MtgCardOrganizerContext))]
    partial class MtgCardOrganizerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Cards.Card", b =>
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

                    b.HasIndex("Name");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Cards.CardSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Artist")
                        .IsRequired();

                    b.Property<int>("CardId");

                    b.Property<string>("MultiverseId");

                    b.Property<string>("Num");

                    b.Property<int>("Rarity");

                    b.Property<int>("SetId");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("SetId");

                    b.ToTable("CardSets");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Cards.Set", b =>
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

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Collections.CardInstance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CardSetId");

                    b.Property<int>("CollectionId");

                    b.Property<bool>("Foil");

                    b.Property<bool>("Promo");

                    b.HasKey("Id");

                    b.HasIndex("CardSetId");

                    b.HasIndex("CollectionId");

                    b.ToTable("CardInstances");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Collections.Collection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContainerId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ContainerId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Collections.CollectionUserFavorite", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<int>("CollectionId");

                    b.HasKey("UserId", "CollectionId");

                    b.HasIndex("CollectionId");

                    b.ToTable("CollectionUserFavorites");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Containers.Container", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsPublic");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int?>("ParentId");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Containers");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Containers.ContainerUserBookmark", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<int>("ContainerId");

                    b.HasKey("UserId", "ContainerId");

                    b.HasIndex("ContainerId");

                    b.ToTable("ContainerUserBookmarks");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Containers.ContainerUserLink", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<int>("ContainerId");

                    b.Property<int>("Permission");

                    b.HasKey("UserId", "ContainerId");

                    b.HasIndex("ContainerId");

                    b.ToTable("ContainerUserLinks");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Decks.Deck", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContainerId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ContainerId");

                    b.ToTable("Decks");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Decks.DeckCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CardId");

                    b.Property<int>("Count");

                    b.Property<int>("DeckId");

                    b.Property<int>("Part");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("DeckId");

                    b.ToTable("DeckCards");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Other.Format", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Formats");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Identity.User", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<int>("BaseContainerId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<bool>("Suspended");

                    b.ToTable("User");

                    b.HasDiscriminator().HasValue("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Cards.CardSet", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Cards.Card", "Card")
                        .WithMany("CardSets")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCardOrganizer.Dal.Entities.Cards.Set", "Set")
                        .WithMany("CardSets")
                        .HasForeignKey("SetId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Collections.CardInstance", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Cards.CardSet", "CardSet")
                        .WithMany("CardInstances")
                        .HasForeignKey("CardSetId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCardOrganizer.Dal.Entities.Collections.Collection", "Collection")
                        .WithMany("CardInstances")
                        .HasForeignKey("CollectionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Collections.Collection", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Containers.Container", "Container")
                        .WithMany("Collections")
                        .HasForeignKey("ContainerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Collections.CollectionUserFavorite", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Collections.Collection", "Collection")
                        .WithMany("CollectionUserFavorites")
                        .HasForeignKey("CollectionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCardOrganizer.Dal.Entities.Identity.User", "User")
                        .WithMany("CollectionUserFavorites")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Containers.Container", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Containers.Container", "Parent")
                        .WithMany("SubContainers")
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Containers.ContainerUserBookmark", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Containers.Container", "Container")
                        .WithMany("ContainerUserBookmarks")
                        .HasForeignKey("ContainerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCardOrganizer.Dal.Entities.Identity.User", "User")
                        .WithMany("ContainerUserBookmarks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Containers.ContainerUserLink", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Containers.Container", "Container")
                        .WithMany("ContainerUserLinks")
                        .HasForeignKey("ContainerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCardOrganizer.Dal.Entities.Identity.User", "User")
                        .WithMany("ContainerUserLinks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Decks.Deck", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Containers.Container", "Container")
                        .WithMany("Decks")
                        .HasForeignKey("ContainerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MtgCardOrganizer.Dal.Entities.Decks.DeckCard", b =>
                {
                    b.HasOne("MtgCardOrganizer.Dal.Entities.Cards.Card", "Card")
                        .WithMany("DeckCards")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MtgCardOrganizer.Dal.Entities.Decks.Deck", "Deck")
                        .WithMany("DeckCards")
                        .HasForeignKey("DeckId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
