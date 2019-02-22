using Microsoft.AspNetCore.Identity;
using MtgCardOrganizer.Bll.Requests;
using MtgCardOrganizer.Bll.Services;
using MtgCardOrganizer.Dal.Utilities;
using MtgCardOrganizer.Seeding.Main;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Seeding.Seeders
{
    public class RoleSeeder : AbstractSeeder<IdentityRole>
    {
        private RoleManager<IdentityRole> _roleManager;
        
        public RoleSeeder(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        
        public async override Task CustomSeed()
        {
            await _roleManager.CreateAsync(new IdentityRole(Roles.Administrator));
            await _roleManager.CreateAsync(new IdentityRole(Roles.StandardUser));
        }
    }
}
