using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Core.Entities;

namespace MtgCardOrganizer.Core.Utilities.General
{
    public static class ChildCollectionExtensions 
    {
        public static async void UpdateChildren<T, TChild>(
            this DbContext context,
            T entity,
            Expression<Func<T, IEnumerable<TChild>>> childSelector)
            where T : Entity where TChild : Entity
        {
            var newChildren = childSelector.Compile().Invoke(entity);
            var currentChildren = await context.Set<T>()
                .Where(x => x.Id == entity.Id)
                .SelectMany(childSelector)
                .ToListAsync();
            
            var additions = newChildren.Where(x => !currentChildren.Select(y => y.Id).Contains(x.Id)).ToList();
            var updates = newChildren.Where(x => currentChildren.Select(y => y.Id).Contains(x.Id)).ToList();
            var removals = currentChildren.Where(x => newChildren.Select(y => y.Id).Contains(x.Id)).ToList();

            var childSet = context.Set<TChild>();
            if (additions.Any()) await childSet.AddRangeAsync(additions);
            if (updates.Any()) childSet.UpdateRange(updates);
            if (removals.Any()) childSet.RemoveRange(removals);
        }
    }
}
