using System;

namespace MtgCardOrganizer.Dal.Exceptions
{
    public class PermissionException : Exception
    {
        public PermissionException(string message) : base(message) { }
    }
}
