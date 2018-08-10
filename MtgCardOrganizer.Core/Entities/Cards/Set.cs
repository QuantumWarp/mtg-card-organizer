using System.Collections.Generic;

namespace MtgCardOrganizer.Core.Entities.Cards
{
    public class Set : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }

        public ICollection<CardSet> CardSetInfos { get; set; }
    }
}
