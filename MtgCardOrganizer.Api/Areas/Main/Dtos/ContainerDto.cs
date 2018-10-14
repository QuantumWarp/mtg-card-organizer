using System.Collections.Generic;

namespace MtgCardOrganizer.Api.Areas.Main.Dtos
{
    public class ContainerDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public bool IsPublic { get; set; }

        public int? ParentId { get; set; }

        public List<ContainerDto> SubContainers { get; set; }
        public List<CollectionDto> Collections { get; set; }
        public List<DeckDto> Decks { get; set; }
    }
}
