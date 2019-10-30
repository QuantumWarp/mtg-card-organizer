using System;

namespace MtgCardOrganizer.Api.Areas.Admin.Dtos
{
    public class AdminUserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool Suspended { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
