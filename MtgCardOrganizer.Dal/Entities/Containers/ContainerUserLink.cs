using MtgCardOrganizer.Dal.Enums;

namespace MtgCardOrganizer.Dal.Entities.Containers
{
    public class ContainerUserLink
    {
        public string UserId { get; set; }
        public Permission Permission { get; set; }

        public int ContainerId { get; set; }
        public Container Container { get; set; }
    }
}
