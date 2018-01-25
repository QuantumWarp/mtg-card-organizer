using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace MtgCoreLib.Utilities.General
{
    public static class ExpressionHelper 
    {
        private static MethodInfo ContainsMethod = typeof(string).GetMethod(nameof(string.Contains), new[] { typeof(string) });
        private static MethodInfo ListContainsMethod = typeof(List<>).GetMethod("Contains");

        public static Expression<Func<T, object>> CreateKeySelectorExpression<T>(PropertySort sort) {  
            var param = Expression.Parameter(typeof(T), "_");
            var property = Expression.Property(param, sort.Field);
            var convertedProperty = Expression.Convert(property, typeof(object));
            return Expression.Lambda<Func<T, object>>(convertedProperty, param);
        }

        public static Expression<Func<T, bool>> CreateFilterExpression<T>(PropertyFilter filter) {
            var param = Expression.Parameter(typeof(T), "_");
            var property = Expression.Property(param, filter.Property);
            UnaryExpression constant;
            if (filter.Value is IList) {
                constant = Expression.Convert(Expression.Constant(filter.Value), typeof(List<>).MakeGenericType(property.Type));
            } else {
                constant = Expression.Convert(Expression.Constant(filter.Value), property.Type);
            }
            var expression = GetBaseExpression(property, constant, filter.Operator);
            var result = Expression.Lambda<Func<T, bool>>(expression, param);
            return result;
        }

        private static Expression GetBaseExpression(MemberExpression property, UnaryExpression constant, PropertyFilterOperator filterOperator) {
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
    }
}
