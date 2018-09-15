using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Enums
{
    public enum Permission
    {
        None = 0,
        Read = 1,
        Write = 2,
        Admin = 3,
    }

    public class PermissionExtensions {
        public static List<Permission> ValidPermissions(Permission permission) {
            switch (permission) {
                case Permission.None:
                    return new List<Permission> { Permission.Admin, Permission.Write, Permission.Read, Permission.None };
                case Permission.Read:
                    return new List<Permission> { Permission.Admin, Permission.Write, Permission.Read };
                case Permission.Write:
                    return new List<Permission> { Permission.Admin, Permission.Write };
                case Permission.Admin:
                    return new List<Permission> { Permission.Admin };
                default:
                    return new List<Permission> {};
            }
        }
    }
}
