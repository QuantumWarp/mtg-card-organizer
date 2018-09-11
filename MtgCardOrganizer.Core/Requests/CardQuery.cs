using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MtgCardOrganizer.Core.Entities.Cards;
using MtgCardOrganizer.Core.Entities.Collections;
using MtgCardOrganizer.Core.Enums;
using MtgCardOrganizer.Core.Requests.Generic;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Requests
{
    public class CardQuery : IQuery<Card>, IQuery<CardSet>, IQuery<CardInstance>
    {
        public Paging Paging { get; set; }

        public List<string> Name { get; set; } = new List<string>();
        public List<string> Text { get; set; } = new List<string>();
        public List<string> Type { get; set; } = new List<string>();
        public ManaCostQuery ManaCost { get; set; } = new ManaCostQuery();

        public List<int> SetIds { get; set; } = new List<int>();
        public List<Rarity> Rarity { get; set; } = new List<Rarity>();
        public List<string> Num { get; set; } = new List<string>();

        public List<int> CollectionIds { get; set; } = new List<int>();

        public IQueryable<Card> ApplyQuery(IQueryable<Card> queryable)
        {
            foreach (var part in Name)
                queryable = queryable.Where(x => 
                    x.Name.ToLower().Contains(part.ToLower()));

            foreach (var part in Text)
                queryable = queryable.Where(x => 
                    x.OracleText.ToLower().Contains(part.ToLower()));

            foreach (var part in Type)
                queryable = queryable.Where(x => 
                    x.Type.ToLower().Contains(part.ToLower()));
            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            // foreach (var setId in SetIds)
            //     queryable = queryable.Where(x => 
            //         x.CardSets.Select(y => y.Id).Contains(setId));
                    
            // foreach (var rarity in Rarity)
            //     queryable = queryable.Where(x => 
            //         x.CardSets.Select(y => y.Rarity).Contains(rarity));

            // foreach (var num in Num.SelectMany(x => NumStrings(x)))
            //     queryable = queryable.Where(x => 
            //         x.CardSets.Select(y => y.Num).Contains(num));

            queryable = queryable.OrderBy(x => x.Name);

            return queryable;
        }

        public IQueryable<CardSet> ApplyQuery(IQueryable<CardSet> queryable)
        {
            foreach (var part in Name)
                queryable = queryable.Where(x => 
                    x.Card.Name.ToLower().Contains(part.ToLower()));

            foreach (var part in Text)
                queryable = queryable.Where(x => 
                    x.Card.OracleText.ToLower().Contains(part.ToLower()));

            foreach (var part in Type)
                queryable = queryable.Where(x => 
                    x.Card.Type.ToLower().Contains(part.ToLower()));
            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            if (SetIds.Any())
                queryable = queryable.Where(x =>
                    SetIds.Contains(x.SetId));
                    
            if (Rarity.Any())
                queryable = queryable.Where(x =>
                    Rarity.Contains(x.Rarity));

            if (Num.Any())
            {
                var nums = Num.SelectMany(x => NumStrings(x));
                queryable = queryable.Where(x => 
                    nums.Contains(x.Num));
            }

            queryable = queryable.OrderBy(x => x.Card.Name);

            return queryable;
        }
        
        public IQueryable<CardInstance> ApplyQuery(IQueryable<CardInstance> queryable)
        {
            foreach (var part in Name)
                queryable = queryable.Where(x => 
                    x.CardSet.Card.Name.ToLower().Contains(part.ToLower()));

            foreach (var part in Text)
                queryable = queryable.Where(x => 
                    x.CardSet.Card.OracleText.ToLower().Contains(part.ToLower()));

            foreach (var part in Type)
                queryable = queryable.Where(x => 
                    x.CardSet.Card.Type.ToLower().Contains(part.ToLower()));
            
            // queryable = queryable.ApplyQuery(ManaCost, transform);

            if (SetIds.Any())
                queryable = queryable.Where(x =>
                    SetIds.Contains(x.CardSet.SetId));
                    
            if (Rarity.Any())
                queryable = queryable.Where(x =>
                    Rarity.Contains(x.CardSet.Rarity));

            if (Num.Any())
            {
                var nums = Num.SelectMany(x => NumStrings(x));
                queryable = queryable.Where(x => 
                    nums.Contains(x.CardSet.Num));
            }

            queryable = queryable.OrderBy(x => x.CardSet.Card.Name);

            return queryable;
        }

        private IEnumerable<string> NumStrings(string searchNum)
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
