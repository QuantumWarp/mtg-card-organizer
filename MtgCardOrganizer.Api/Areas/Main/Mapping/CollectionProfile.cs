using AutoMapper;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Dal.Entities.Collections;

namespace MtgCardOrganizer.Api.Areas.Main.Mapping
{
    public class CollectionProfile : Profile
    {
        public CollectionProfile()
        {
            CreateMap<Collection, CollectionDto>(MemberList.Destination);
            CreateMap<CollectionDto, Collection>(MemberList.Source);

            CreateMap<CardInstance, CardInstanceDto>(MemberList.Destination);
            CreateMap<CardInstanceDto, CardInstance>(MemberList.Source);
        }
    }
}
