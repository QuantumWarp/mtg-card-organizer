using MtgCardOrganizer.Api.Areas.Common.Dtos;

namespace MtgCardOrganizer.Api.Areas.Main.Dtos
{
    public class CardInstanceDto
    {
        public int Id { get; set; }

        public bool Foil { get; set; }
        public bool Promo { get; set; }

        public int CardSetId { get; set; }
        public int CollectionId { get; set; }

        public CardSetDto CardSet { get; set; }
    }
}
