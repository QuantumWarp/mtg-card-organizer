using AutoMapper;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Dal.Entities.Cards;

namespace MtgCardOrganizer.Api.Areas.Common.Mapping
{
    public class SetProfile : Profile
    {
        public SetProfile()
        {
            CreateMap<Set, SetDto>(MemberList.Destination);
        }
    }
}
