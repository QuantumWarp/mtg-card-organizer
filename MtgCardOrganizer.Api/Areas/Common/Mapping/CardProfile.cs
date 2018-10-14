using AutoMapper;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Api.Areas.Common.Mapping
{
    public class CardProfile : Profile
    {
        public CardProfile()
        {
            CreateMap<Card, CardDto>(MemberList.Destination);
        }
    }
}
