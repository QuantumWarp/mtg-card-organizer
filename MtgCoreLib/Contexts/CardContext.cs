﻿using Microsoft.EntityFrameworkCore;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Other;

namespace MtgCoreLib.Contexts
{
    public class CardContext : DbContext
    {
        public CardContext(DbContextOptions<CardContext> options) : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<CardSetInfo> CardSetInfos { get; set; }
        public DbSet<Format> Formats { get; set; }
        public DbSet<Set> Sets { get; set; }
    }
}
