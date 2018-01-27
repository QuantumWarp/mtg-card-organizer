using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Collections
{
    public class CollectionDto : EntityDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public bool hasSubCollections { get; set; }
        public bool hasCards { get; set; }
    }
}
