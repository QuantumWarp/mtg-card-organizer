using System.Collections.Generic;
using System.Linq;
using MtgCardOrganizer.Core.Enums;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Requests.CardQueries
{
    public abstract class AbstractCardQuery<T> : IQuery<T>
    {
        public Paging Paging { get; set; }

        public List<string> Name { get; set; } = new List<string>();
        public List<string> Text { get; set; } = new List<string>();
        public List<string> Type { get; set; } = new List<string>();
        // public ManaCostQuery ManaCost { get; set; } = new ManaCostQuery();

        public List<int> SetIds { get; set; } = new List<int>();
        public List<Rarity> Rarities { get; set; } = new List<Rarity>();
        public List<string> Nums { get; set; } = new List<string>();

        public List<int> CollectionIds { get; set; } = new List<int>();

        public IQueryable<T> ApplyQuery(IQueryable<T> queryable)
        {
            queryable = ApplyIncludes(queryable);

            foreach (var part in Name) queryable = NameContains(queryable, part.ToLower());
            foreach (var part in Text) queryable = OracleTextContains(queryable, part.ToLower());
            foreach (var part in Type) queryable = TypeContains(queryable, part.ToLower());            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            var nums = Nums.SelectMany(x => NumStrings(x)).ToList();
            if (SetIds.Any()) queryable = IsInSets(queryable, SetIds);
            if (Rarities.Any()) queryable = IsInRarities(queryable, Rarities);
            if (nums.Any()) queryable = IsInNums(queryable, nums);

            queryable = OrderResults(queryable);

            return queryable;
        }

        protected abstract IQueryable<T> ApplyIncludes(IQueryable<T> queryable);

        protected abstract IQueryable<T> NameContains(IQueryable<T> queryable, string substring);
        protected abstract IQueryable<T> OracleTextContains(IQueryable<T> queryable, string substring);
        protected abstract IQueryable<T> TypeContains(IQueryable<T> queryable, string substring);

        protected abstract IQueryable<T> IsInSets(IQueryable<T> queryable, List<int> setIds);
        protected abstract IQueryable<T> IsInRarities(IQueryable<T> queryable, List<Rarity> rarities);
        protected abstract IQueryable<T> IsInNums(IQueryable<T> queryable, List<string> nums);

        protected abstract IQueryable<T> IsInCollections(IQueryable<T> queryable, List<int> collectionIds);

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
