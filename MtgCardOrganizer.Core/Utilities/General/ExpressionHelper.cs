using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using MtgCardOrganizer.Core.Requests.Generic;

namespace MtgCardOrganizer.Core.Utilities.General
{
    public static class ExpressionHelper 
    {
        private static MethodInfo ContainsMethod = typeof(string).GetMethod(nameof(string.Contains), new[] { typeof(string) });
        private static MethodInfo ListContainsMethod = typeof(List<int>).GetMethod("Contains");

        public static Expression<Func<T, object>> CreateKeySelectorExpression<T>(PropertySort<T> sort) {  
            var param = Expression.Parameter(typeof(T), "_");
            var property = Expression.Property(param, sort.Field);
            var convertedProperty = Expression.Convert(property, typeof(object));
            return Expression.Lambda<Func<T, object>>(convertedProperty, param);
        }

        public static Expression<Func<T, bool>> CreateFilterExpression<T>(PropertyFilter<T> filter) {
            var param = Expression.Parameter(typeof(T), "_");
            var property = Expression.Property(param, filter.Property);
            ConstantExpression constant;
            if (filter.Value is List<string>) {
                MethodInfo method = typeof(ExpressionHelper).GetMethod("ConvertList");
                MethodInfo generic = method.MakeGenericMethod(property.Type);
                constant = Expression.Constant(generic.Invoke(null, new [] { filter.Value }));
            } else {
                if (filter.Value as string == "null") {
                    constant = Expression.Constant(null);
                } else if (property.Type == typeof(int?)) {
                    constant = Expression.Constant(int.Parse((string)filter.Value), typeof(int?));
                } else {
                    constant = Expression.Constant(Convert.ChangeType(filter.Value, property.Type));
                }
            }
            var expression = GetBaseExpression(property, constant, filter.Operator);
            var result = Expression.Lambda<Func<T, bool>>(expression, param);
            return result;
        }

        public static List<T> ConvertList<T>(List<string> inputList) {
            return inputList.Select(x => (T)Convert.ChangeType(x, typeof(T))).ToList();
        }

        private static Expression GetBaseExpression(MemberExpression property, ConstantExpression constant, PropertyFilterOperator filterOperator) {
            switch (filterOperator) {
                case PropertyFilterOperator.IsEqual:
                    return Expression.Equal(property, constant);
                case PropertyFilterOperator.Contains:
                    return Expression.Call(property, ContainsMethod, constant);
                case PropertyFilterOperator.IsContainedIn:
                    return Expression.Call(constant, ListContainsMethod, property);
                default:
                    throw new ArgumentOutOfRangeException("filterOperator");
            }
        }

        public static Expression<Func<TOuter, TInner>> Combine<TOuter, TMiddle, TInner>(Expression<Func<TOuter, TMiddle>> first, Expression<Func<TMiddle, TInner>> second)
        {
            var parameter = Expression.Parameter(typeof(TOuter), "x");
            var firstInvoke = Expression.Invoke(first, new[] { parameter });
            var secondInvoke = Expression.Invoke(second, new[] { firstInvoke} );
            return Expression.Lambda<Func<TOuter, TInner>>(secondInvoke, parameter);
        }
    }
}
