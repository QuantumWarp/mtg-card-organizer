using System.Security.Claims;

namespace MtgCardOrganizer.Dal.Utilities
{
    public interface IUserService
    {
        string Id { get; }
        string Email { get; }
        string Username { get; }
    }
}
