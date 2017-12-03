namespace MtgCoreLib.Dtos.Cards
{
    public class CardDto
    {
        public string CardId { get; set; }
        public string Name { get; set; }
        public string ManaCost { get; set; }
        public string ConvertedManaCost { get; set; }
        public string Power { get; set; }
        public string Toughness { get; set; }
        public string OracleText { get; set; }
    }
}
