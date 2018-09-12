using MtgCardOrganizer.Core.Enums;

namespace MtgCardOrganizer.Core.Entities.Containers
{
    public class ContainerUserLink
    {
        public string UserId { get; set; }
        public Permission Permission { get; set; }

        public int ContainerId { get; set; }
        public Container Container { get; set; }
    }
}