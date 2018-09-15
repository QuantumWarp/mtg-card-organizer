using MtgCardOrganizer.Dal.Entities.Identity;
using MtgCardOrganizer.Dal.Utilities;

namespace MtgCardOrganizer.Seeding.Utilities
{
    public class DummyUserService : IUserService
    {
        public string Id { get; set; } = "Seed";
        public string Email { get; set; } = "Seed";
        public string Username { get; set; } = "Seed";

        public void SetUser(User user)
        {
            Id = user.Id;
            Email = user.Email;
            Username = user.UserName;
        }
    }
}
