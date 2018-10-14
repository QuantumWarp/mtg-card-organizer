using AutoMapper;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Api.Areas.Main.Mapping
{
    public class ContainerProfile : Profile
    {
        public ContainerProfile()
        {
            CreateMap<Container, ContainerDto>(MemberList.Destination)
                .ForMember(x => x.IsBookmarked, opt => opt.Ignore());
            CreateMap<ContainerDto, Container>(MemberList.Source)
                .ForSourceMember(x => x.IsBookmarked, opt => opt.Ignore());
        }
    }
}
