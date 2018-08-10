using System.Collections.Generic;

namespace MtgCardOrganizer.Core.Requests.Generic
{
    public class QueryModel<TDto>
    {
        public Paging Paging { get; set; } = new Paging();
        public PropertySort<TDto> Sort { get; set; } = null;
        public IEnumerable<PropertyFilter<TDto>> Filters { get; set; } = new List<PropertyFilter<TDto>>();
    }
}
