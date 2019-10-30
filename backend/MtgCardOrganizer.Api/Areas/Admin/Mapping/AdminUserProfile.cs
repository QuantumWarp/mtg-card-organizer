using AutoMapper;
using MtgCardOrganizer.Api.Areas.Admin.Dtos;
using MtgCardOrganizer.Dal.Entities.Identity;

namespace MtgCardOrganizer.Api.Areas.Admin.Mapping
{
    public class AdminUserProfile : Profile
    {
        public AdminUserProfile()
        {
            CreateMap<User, AdminUserDto>(MemberList.Destination);
        }
    }
}
