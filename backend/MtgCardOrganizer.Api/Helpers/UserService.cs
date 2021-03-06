using MtgCardOrganizer.Dal.Utilities;
using System.Linq;
using System.Security.Claims;

namespace MtgCardOrganizer.Api.Helpers
{
    public class UserService : IUserService
    {
        private ClaimsPrincipal _claimsPrincipal;

        public string Id => GetClaim("sub");
        public string Email => GetClaim("email");
        public string Username => GetClaim("username");

        public UserService(ClaimsPrincipal claimsPrincipal) {
            _claimsPrincipal = claimsPrincipal;
        }

        private string GetClaim(string key) {
            var claim = _claimsPrincipal.Claims.FirstOrDefault(x => x.Type == key);
            return claim?.Value;
        }
    }
}
