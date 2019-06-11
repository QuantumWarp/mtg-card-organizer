using System.Collections.Generic;
using System.Linq;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Requests.Generic;
using MtgCardOrganizer.Dal.Utilities;

namespace MtgCardOrganizer.Dal.Requests.CardQueries
{
    public abstract class AbstractCardQuery<T> : IQuery<T>
    {
        public Paging Paging { get; set; }

        public List<string> Name { get; set; } = new List<string>();
        public List<string> Text { get; set; } = new List<string>();
        public List<string> Type { get; set; } = new List<string>();
        // public ManaCostQuery ManaCost { get; set; } = new ManaCostQuery();

        public abstract IQueryable<T> ApplyQuery(IQueryable<T> queryable);

        protected abstract IQueryable<T> ApplyIncludes(IQueryable<T> queryable);

        protected abstract IQueryable<T> NameContains(IQueryable<T> queryable, string substring);
        protected abstract IQueryable<T> TextContains(IQueryable<T> queryable, string substring);
        protected abstract IQueryable<T> TypeContains(IQueryable<T> queryable, string substring);

        protected abstract IQueryable<T> OrderResults(IQueryable<T> queryable);

        protected IEnumerable<string> NumStrings(string searchNum)
        {
            while (searchNum.Length < 4) 
                searchNum = "0" + searchNum;

            while (searchNum.StartsWith("0"))
            {
                yield return searchNum;
                searchNum = searchNum.Substring(1);
            }

            yield return searchNum;
        }
    }
}
