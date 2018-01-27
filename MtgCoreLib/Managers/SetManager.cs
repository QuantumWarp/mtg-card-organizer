using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper.QueryableExtensions;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Initialization;
using MtgCoreLib.Utilities.General;

namespace MtgCoreLib.Managers
{
    public interface ISetManager
    {
        PagedData<SetDto> GetSets(PageSortFilter pageSortFilter);
    }

    public class SetManager : ISetManager
    {
        private MtgCoreLibContext _dbContext;

        public SetManager(MtgCoreLibContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PagedData<SetDto> GetSets(PageSortFilter pageSortFilter)
        {
            return new PagedData<SetDto>(
                _dbContext.Sets.ProjectTo<SetDto>().ApplyPageSortFilter(pageSortFilter), 
                _dbContext.Sets.Count());
        }
    }
}
