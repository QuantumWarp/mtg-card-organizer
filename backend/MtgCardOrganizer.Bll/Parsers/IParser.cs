using MtgCardOrganizer.Dal.Entities.Cards;
using System.Collections.Generic;

namespace MtgCardOrganizer.Bll.Parsers
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