using System;

namespace MtgCardOrganizer.Bll.Exceptions
{
    public class RegistrationException : Exception
    {
        public RegistrationException() { }
        public RegistrationException(string message) : base(message) { }
        public RegistrationException(string message, Exception innerException) : base(message, innerException) { }
    }
}
