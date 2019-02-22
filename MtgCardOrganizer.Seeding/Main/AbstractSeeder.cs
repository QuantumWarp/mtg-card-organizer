using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Seeding.Main
{
    public interface IAbstractSeeder
    {
        void Initialize();
    }

    public abstract class AbstractSeeder<T> : IAbstractSeeder
    {
        public List<T> SeedData;

        public void Initialize()
        {
            SeedData = CreateData().ToList();
        }

        protected virtual IEnumerable<T> CreateData()
        {
            return new List<T>();
        }

        public virtual Task CustomSeed()
        {
            return Task.CompletedTask;
        }
    }
}
