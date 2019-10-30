using AutoMapper;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Dal.Entities.Collections;

namespace MtgCardOrganizer.Api.Areas.Main.Mapping
{
    public class CollectionProfile : Profile
    {
        public CollectionProfile()
        {
            CreateMap<Collection, CollectionDto>(MemberList.Destination)
                .ForMember(x => x.IsBookmarked, opt => opt.Ignore());
            CreateMap<CollectionDto, Collection>(MemberList.Source)
                .ForSourceMember(x => x.IsBookmarked, opt => opt.Ignore()); ;

            CreateMap<CardInstance, CardInstanceDto>(MemberList.Destination);
            CreateMap<CardInstanceDto, CardInstance>(MemberList.Source);
        }
    }
}
