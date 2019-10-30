using MtgCardOrganizer.Dal.Entities.Identity;

namespace MtgCardOrganizer.Dal.Entities.Containers
{
    public class ContainerUserBookmark
    {
        public string UserId { get; set; }
        public int ContainerId { get; set; }
        public User User { get; set; }
        public Container Container { get; set; }
    }
}
