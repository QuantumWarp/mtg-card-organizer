using System;

namespace MtgCoreLib.Utilities.Parsers
{
    public enum ParseType
    {
        MtgJson,
    }

    public static class ParseTypeExtensions
    {
        public static IParser GetParser(this ParseType type)
        {
            switch (type)
            {
                case ParseType.MtgJson: return new MtgJsonParser();
            }

            throw new Exception($"Unknown type {type}");
        }
    }
}
