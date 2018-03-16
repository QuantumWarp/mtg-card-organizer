using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MtgCoreLib.Entities.Collections
{
    public class CollectionUserLink : Entity
    {   
        public string UserId { get; set; }
        
        public int CollectionId { get; set; }

        [ForeignKey(nameof(CollectionId))]
        public Collection Collection { get; set; }

        public Permission Permission { get; set; }
    }
}
