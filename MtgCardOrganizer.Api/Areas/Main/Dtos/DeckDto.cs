using System.Collections.Generic;

namespace MtgCardOrganizer.Api.Areas.Main.Dtos
{
    public class DeckDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int ContainerId { get; set; }

        public List<DeckCardDto> DeckCards { get; set; }
    }
}
