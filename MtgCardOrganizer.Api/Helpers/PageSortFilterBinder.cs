using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;

public class PageSortFilterProvider : IModelBinderProvider
{
    public IModelBinder GetBinder(ModelBinderProviderContext context)
    {
        if (context.Metadata.ModelType == typeof(PageSortFilter))  
            return new PageSortFilterBinder();  
        return null;  
    }
}

public class PageSortFilterBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null)  
            throw new ArgumentNullException(nameof(bindingContext));  

        var pageSortFilter = new PageSortFilter();
        var queryCollection = bindingContext.ActionContext.HttpContext.Request.Query;
        
        if (queryCollection.TryParseOffset(bindingContext, out int offset))
            pageSortFilter.Offset = offset;

        if (queryCollection.TryParseLimit(bindingContext, out int limit))
            pageSortFilter.Limit = limit;

        if (queryCollection.TryParseSort(bindingContext, out PropertySort propertySort))
            pageSortFilter.Sort = propertySort;

        if (queryCollection.TryParseFilter(bindingContext, out List<PropertyFilter> propertyFilters))
            pageSortFilter.Filters = propertyFilters;
        
        if (bindingContext.ModelState.ErrorCount == 0) {
            bindingContext.Result = ModelBindingResult.Success(pageSortFilter);
        } else {
            bindingContext.Result = ModelBindingResult.Failed();
        }

        return Task.CompletedTask;
    }
}

// Example query string: offset=5&limit=5&sort=-field1&filter=field1 eq 'value'
public static class PageSortFilterParseHelper {
    public static bool TryParseOffset(this IQueryCollection queryCollection, ModelBindingContext bindingContext, out int offset) {
        offset = 0;
        if (!queryCollection.ContainsKey("offset"))
            return false;

        if (!int.TryParse(queryCollection["offset"], out offset)) {
            bindingContext.ModelState.AddModelError("offset", $"Failed to parse offset '{queryCollection["limit"]}'");
            return false;
        }

        return true;
    }

    public static bool TryParseLimit(this IQueryCollection queryCollection, ModelBindingContext bindingContext, out int limit) {
        limit = 0;
        if (!queryCollection.ContainsKey("limit"))
            return false;

        if (!int.TryParse(queryCollection["limit"], out limit)) {
            bindingContext.ModelState.AddModelError("limit", $"Failed to parse limit '{queryCollection["limit"]}'");
            return false;
        }

        return true;
    }
    
    public static bool TryParseSort(this IQueryCollection queryCollection, ModelBindingContext bindingContext, out PropertySort propertySort) {
        propertySort = null;
        if (!queryCollection.ContainsKey("sort"))
            return false;
        
        var sortString = queryCollection["sort"].ToString();
        var acsending = !sortString.StartsWith('-');
        sortString = (sortString.StartsWith('-') || sortString.StartsWith('+')) ? sortString.Substring(1) : sortString;

        propertySort = new PropertySort() {
            Ascending = acsending,
            Field = sortString,
        };

        return true;
    }
    
    public static bool TryParseFilter(this IQueryCollection queryCollection, ModelBindingContext bindingContext, out List<PropertyFilter> propertyFilters) {
        propertyFilters = new List<PropertyFilter>();
        if (!queryCollection.ContainsKey("filter"))
            return false;
        
        var filtersString = queryCollection["filter"].ToString();
        var filtersSplit = filtersString.Split(" and ");

        foreach (var filterString in filtersSplit) {
            var filterParts = filtersString.Split(' ');
            
            if (filterParts.Length < 3) {                
                bindingContext.ModelState.AddModelError("filter", $"Failed to parse filter '{filterString}'");
                return false;
            }
            
            if (!PropertyFilterOperatorHelper.TryParse(filterParts[1], out PropertyFilterOperator propertyFilterOperator)) {        
                bindingContext.ModelState.AddModelError("filter", $"Failed to parse filter operator '{filterString}'");
                return false;
            }

            propertyFilters.Add(new PropertyFilter() {
                Property = filterParts[0],
                Operator = propertyFilterOperator,
                Value = filterString.Substring(filterParts[0].Length + filterParts[1].Length + 2).Trim('\'')
            });
        }

        return true;
    }
}
