﻿using Microsoft.AspNetCore.Identity;
using MtgCardOrganizer.Dal.Entities.Containers;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Entities.Identity
{
    public class User : IdentityUser
    {
        public int BaseContainerId { get; set; }
        public ICollection<ContainerUserLink> ContainerUserLinks { get; set; }
    }
}
