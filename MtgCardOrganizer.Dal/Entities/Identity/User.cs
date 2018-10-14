﻿using Microsoft.AspNetCore.Identity;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Entities.Containers;
using System;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Entities.Identity
{
    public class User : IdentityUser
    {
        public int BaseContainerId { get; set; }

        public ICollection<ContainerUserLink> ContainerUserLinks { get; set; }
        public ICollection<ContainerUserBookmark> ContainerUserBookmarks { get; set; }
        public ICollection<CollectionUserFavorite> CollectionUserFavorites { get; set; }

        public bool Suspended { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
