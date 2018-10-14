using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Dal.Entities.Decks;

namespace MtgCardOrganizer.Api.Areas.Main.Dtos
{
    public class DeckCardDto
    {
        public int Id { get; set; }
        
        public int CardId { get; set; }
        public CardDto Card { get; set; }

        public DeckPart Part { get; set; }
        public int Count { get; set; }
    }
}
