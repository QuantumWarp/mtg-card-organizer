using MtgCoreLib.Dtos.Enums;
using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Collections
{
    public class CollectionDto : EntityDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public string OwnerUserId { get; set; }
        public Permission Permission { get; set; }
    }
}
