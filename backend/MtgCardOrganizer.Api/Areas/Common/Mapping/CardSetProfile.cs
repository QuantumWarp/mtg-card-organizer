using AutoMapper;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Api.Areas.Common.Mapping
{
    public class CardSetProfile : Profile
    {
        public CardSetProfile()
        {
            CreateMap<CardSet, CardSetDto>(MemberList.Destination);
        }
    }
}
