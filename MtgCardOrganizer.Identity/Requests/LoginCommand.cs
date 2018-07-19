using Microsoft.AspNetCore.Identity;

namespace MtgCardOrganizer.Identity.Requests
{
    public class LoginCommand
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}