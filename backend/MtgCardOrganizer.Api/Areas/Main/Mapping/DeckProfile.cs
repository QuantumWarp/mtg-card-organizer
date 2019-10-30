using AutoMapper;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Dal.Entities.Decks;

namespace MtgCardOrganizer.Api.Areas.Main.Mapping
{
    public class DeckProfile : Profile
    {
        public DeckProfile()
        {
            CreateMap<Deck, DeckDto>(MemberList.Destination);
            CreateMap<DeckDto, Deck>(MemberList.Source);

            CreateMap<DeckCard, DeckCardDto>(MemberList.Destination);
            CreateMap<DeckCardDto, DeckCard>(MemberList.Source);
        }
    }
}
