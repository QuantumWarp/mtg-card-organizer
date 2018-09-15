using Microsoft.AspNetCore.Identity;

namespace MtgCardOrganizer.Bll.Requests
{
    public class LoginCommand
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}