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
        PagedData<SetDto> GetSets(QueryModel<SetDto> queryModel);
    }

    public class SetManager : ISetManager
    {
        private MtgCoreLibContext _dbContext;

        public SetManager(MtgCoreLibContext dbContext)
        {
            _dbContext = dbContext;
        }

        public PagedData<SetDto> GetSets(QueryModel<SetDto> queryModel)
        {
            return _dbContext.Sets.AsPagedData(queryModel);
        }
    }
}
