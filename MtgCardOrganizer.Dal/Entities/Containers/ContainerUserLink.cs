using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Entities.Containers
{
    public class ContainerUserLink
    {
        public Permission Permission { get; set; }

        public string UserId { get; set; }
        public int ContainerId { get; set; }
        public User User { get; set; }
        public Container Container { get; set; }
    }
}
