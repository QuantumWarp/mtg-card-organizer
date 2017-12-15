using System;

namespace MtgCoreLib.Dtos.Enums
{
    public enum Rarity
    {
        Unknown,
        Common,
        Uncommon,
        Rare,
        Mythic,
    }

    public static class RarityExtensions {
        public static Rarity Parse(string rarityString) {
            if (Enum.TryParse(rarityString, out Rarity result)) {
                return result;
            } else {
                return Rarity.Unknown;
            }
        }
    }
}
