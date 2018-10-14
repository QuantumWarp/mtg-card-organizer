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
                .ForMember(x => x.IsBookmarked, opt => opt.Ignore())
                .ForMember(x => x.Permission, opt => opt.Ignore());
            CreateMap<ContainerDto, Container>(MemberList.Source)
                .ForSourceMember(x => x.IsBookmarked, opt => opt.Ignore())
                .ForSourceMember(x => x.Permission, opt => opt.Ignore());

            CreateMap<ContainerUserPermission, UserPermissionDto>(MemberList.Destination)
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.User.UserName));
            CreateMap<UserPermissionDto, ContainerUserPermission>(MemberList.Source)
                .ForSourceMember(x => x.UserName, opt => opt.Ignore());
        }
    }
}
