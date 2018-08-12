using MtgCardOrganizer.Core.Entities.Cards;
using System.Collections.Generic;

namespace MtgCardOrganizer.Core.Utilities.Parsers
{
    public interface IParser
    {
        List<Set> Sets { get; }
        List<Card> Cards { get; }
        List<CardSet> CardSets { get; }
        
        string Retrieve();
        void Parse(string text);
    }
}