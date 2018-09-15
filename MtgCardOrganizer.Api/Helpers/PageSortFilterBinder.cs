using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MtgCardOrganizer.Dal.Requests.Generic;

namespace MtgCardOrganizer.Api.Helpers
{
    public class PageSortFilterProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (!context.Metadata.ModelType.IsGenericType || context.Metadata.ModelType.GetGenericTypeDefinition() != typeof(QueryModel<>)) 
                return null;
            
            var binder = typeof(PageSortFilterBinder<>);
            var binderGeneric = binder.MakeGenericType(context.Metadata.ModelType.GenericTypeArguments[0]);
            return (IModelBinder)Activator.CreateInstance(binderGeneric);
        }
    }

    public class PageSortFilterBinder<T> : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)  
                throw new ArgumentNullException(nameof(bindingContext));  

            var pageSortFilter = new QueryModel<T>();
            var queryCollection = bindingContext.ActionContext.HttpContext.Request.Query;
            
            if (queryCollection.TryParseOffset(bindingContext, out int offset))
                pageSortFilter.Paging.Offset = offset;

            if (queryCollection.TryParseLimit(bindingContext, out int limit))
                pageSortFilter.Paging.Limit = limit;

            if (queryCollection.TryParseSort(bindingContext, out PropertySort<T> propertySort))
                pageSortFilter.Sort = propertySort;

            if (queryCollection.TryParseFilter(bindingContext, out List<PropertyFilter<T>> propertyFilters))
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
        
        public static bool TryParseSort<TDto>(this IQueryCollection queryCollection, ModelBindingContext bindingContext, out PropertySort<TDto> propertySort) {
            propertySort = null;
            if (!queryCollection.ContainsKey("sort"))
                return false;
            
            var sortString = queryCollection["sort"].ToString();
            var ascending = !sortString.StartsWith('-');
            sortString = (sortString.StartsWith('-') || sortString.StartsWith('+')) ? sortString.Substring(1) : sortString;

            propertySort = new PropertySort<TDto>(sortString, ascending);

            return true;
        }
        
        public static bool TryParseFilter<T>(this IQueryCollection queryCollection, ModelBindingContext bindingContext, out List<PropertyFilter<T>> propertyFilters) {
            propertyFilters = new List<PropertyFilter<T>>();
            if (!queryCollection.ContainsKey("filter"))
                return false;
            
            var filtersString = queryCollection["filter"].ToString();
            var filtersSplit = filtersString.Split(" and ");

            foreach (var filterString in filtersSplit) {
                var filterParts = filterString.Split(' ');
                
                if (filterParts.Length < 3) {                
                    bindingContext.ModelState.AddModelError("filter", $"Failed to parse filter '{filterString}'");
                    return false;
                }
                
                if (!PropertyFilterOperatorHelper.TryParse(filterParts[1], out PropertyFilterOperator propertyFilterOperator)) {        
                    bindingContext.ModelState.AddModelError("filter", $"Failed to parse filter operator '{filterString}'");
                    return false;
                }

                object value;
                var valueArg = filterString.Substring(filterParts[0].Length + filterParts[1].Length + 2);
                if (valueArg.StartsWith('[')) {
                    value = valueArg.Trim(new[] { '[', ']' }).Split(',').Select(x => x.Trim('\'')).ToList();
                } else {
                    value = valueArg.Trim('\'');
                }

                propertyFilters.Add(new PropertyFilter<T>() {
                    Property = filterParts[0],
                    Operator = propertyFilterOperator,
                    Value = value
                });
            }

            return true;
        }
    }
}
