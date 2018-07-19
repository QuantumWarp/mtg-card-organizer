using MtgCoreLib.Dtos.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MtgCoreLib.Entities.Collections
{
    public class CollectionUserLink
    {   
        [Key]
        public string UserId { get; set; }

        [Key]        
        public int CollectionId { get; set; }

        [ForeignKey(nameof(CollectionId))]
        public Collection Collection { get; set; }

        public Permission Permission { get; set; }
    }
}
