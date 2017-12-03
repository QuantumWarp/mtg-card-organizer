using MtgCoreLib.Dtos.Cards;
using System.Collections.Generic;

namespace  MtgCoreLib.Utilities.Parsers
{
    public interface IParser
    {
        List<SetDto> SetDtos { get; }
        List<CardDto> CardDtos { get; }
        List<CardSetInfoDto> CardSetInfoDtos { get; }
        
        string Retrieve();
        void Parse(string text);
    }
}