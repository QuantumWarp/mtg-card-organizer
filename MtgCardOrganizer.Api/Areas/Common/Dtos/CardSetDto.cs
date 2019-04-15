using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Api.Areas.Common.Dtos
{
    public class CardSetDto
    {
        public int Id { get; set; }

        public string MultiverseId { get; set; }
        public string Artist { get; set; }
        public string Num { get; set; }
        public Rarity? Rarity { get; set; }

        public int CardId { get; set; }
        public int SetId { get; set; }
        public CardDto Card { get; set; }
        public SetDto Set { get; set; }
    }
}
