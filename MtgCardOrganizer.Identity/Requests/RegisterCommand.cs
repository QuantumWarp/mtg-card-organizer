using Microsoft.AspNetCore.Identity;

namespace MtgCardOrganizer.Identity.Requests
{
    public class RegisterCommand
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}