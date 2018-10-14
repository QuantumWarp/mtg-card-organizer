using AutoMapper;
using MtgCardOrganizer.Api.Areas.Common.Dtos;
using MtgCardOrganizer.Dal.Entities.Identity;

namespace MtgCardOrganizer.Api.Areas.Common.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>(MemberList.Destination);
        }
    }
}
