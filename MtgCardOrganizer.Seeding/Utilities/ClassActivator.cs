using System;
using System.Linq.Expressions;
using System.Reflection;

namespace MtgCardOrganizer.Seeding.Utilities
{
    public class ClassActivator<T> where T : class
    {
        private T _obj;

        public ClassActivator(T initialValue = null)
        {
            _obj = initialValue;

            if (initialValue == null)
            {
                _obj = (T)Activator.CreateInstance(typeof(T), true);
            }
        }

        public ClassActivator<T> Set<TProp>(Expression<Func<T, TProp>> property, TProp value)
        {
            var member = property.Body as MemberExpression;
            var propInfo = member.Member as PropertyInfo;
            propInfo.SetValue(_obj, value, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance, null, null, null);
            return this;
        }

        public T Cast()
        {
            return this;
        }

        public static ClassActivator<T> Build(T initialValue = null)
        {
            return new ClassActivator<T>(initialValue);
        }

        public static implicit operator T(ClassActivator<T> classActivator)
        {
            return classActivator._obj;
        }
    }
}
