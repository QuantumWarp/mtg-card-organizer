using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Api.Areas.Main.Dtos
{
    public class UserPermissionDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public Permission Permission { get; set; }
    }
}
