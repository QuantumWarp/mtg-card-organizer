using System;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Entities.Cards
{
    public class Set : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime ReleaseDate { get; set; }

        public ICollection<CardSet> CardSets { get; set; }
    }
}
