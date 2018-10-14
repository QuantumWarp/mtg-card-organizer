using AutoMapper;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Api.Areas.Main.Mapping
{
    public class ContainerProfile : Profile
    {
        public ContainerProfile()
        {
            CreateMap<Container, ContainerDto>(MemberList.Destination);
            CreateMap<ContainerDto, Container>(MemberList.Source);
        }
    }
}
