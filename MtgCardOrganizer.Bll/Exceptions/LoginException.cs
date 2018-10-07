using System;

namespace MtgCardOrganizer.Bll.Exceptions
{
    public class LoginException : Exception
    {
        public LoginException(string message) : base(message) { }
    }
}
