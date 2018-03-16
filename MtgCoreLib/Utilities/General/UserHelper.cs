using System.Linq;
using System.Security.Claims;

public static class UserHelper {
    public static string GetId(this ClaimsPrincipal user) {
        return user.Claims.First(x => x.Type == "sub").Value;
    }
}
