using Microsoft.AspNetCore.Identity;

namespace MtgCardOrganizer.Bll.Requests
{
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}