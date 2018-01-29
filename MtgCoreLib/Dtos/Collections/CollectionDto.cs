using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Collections
{
    public class CollectionDto : EntityDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
    }
}
