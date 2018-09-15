using System;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Enums
{
    public enum Permission
    {
        Owner = 0,
        Write = 1,
        Read = 2,
        None = 3,
    }

    public class PermissionExtensions {
        public static List<Permission> ValidPermissions(Permission permission) {
            switch (permission) {
                case Permission.None:
                    return new List<Permission> { Permission.Owner, Permission.Write, Permission.Read, Permission.None };
                case Permission.Read:
                    return new List<Permission> { Permission.Owner, Permission.Write, Permission.Read };
                case Permission.Write:
                    return new List<Permission> { Permission.Owner, Permission.Write };
                case Permission.Owner:
                    return new List<Permission> { Permission.Owner };
                default:
                    return new List<Permission> {};
            }
        }
    }
}
