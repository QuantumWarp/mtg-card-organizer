using MtgCardOrganizer.Api.Areas.Common.Dtos;

namespace MtgCardOrganizer.Api.Areas.Main.Dtos
{
    public class CardInstanceGroupedCardSetDto
    {
        public CardSetDto CardSet { get; set; }

        public int Count { get; set; }
        public int FoilCount { get; set; }

    }
}
