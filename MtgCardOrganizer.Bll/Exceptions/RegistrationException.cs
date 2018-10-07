using System;

namespace MtgCardOrganizer.Bll.Exceptions
{
    public class RegistrationException : Exception
    {
        public RegistrationException(string message) : base(message) { }
    }
}
