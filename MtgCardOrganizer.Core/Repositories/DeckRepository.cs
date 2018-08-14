using System.Threading.Tasks;
using MtgCardOrganizer.Core.Entities.Decks;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Utilities.General;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface IDeckRepository
    {
        Task<Deck> GetAsync(int id);
        Task<Deck> CreateAsync(Deck deck);
        Task<Deck> UpdateAsync(Deck deck);
        Task DeleteAsync(int id);
    }

    public class DeckRepository : IDeckRepository
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly UserService _user;

        public DeckRepository(UserService user, MtgCardOrganizerContext dbContext)
        {
            _user = user;
            _dbContext = dbContext;
        }

        public async Task<Deck> GetAsync(int id)
        {
            return await _dbContext.Decks.FindAsync(id);
        }

        public async Task<Deck> CreateAsync(Deck deck)
        {
            await _dbContext.Decks.AddAsync(deck);
            await _dbContext.SaveChangesAsync();
            return deck;
        }

        public async Task<Deck> UpdateAsync(Deck deck)
        {
            _dbContext.Decks.Update(deck);
            await _dbContext.SaveChangesAsync();
            return deck;
        }

        public async Task DeleteAsync(int id)
        {
            var deck = await _dbContext.Decks.FindAsync(id);
            _dbContext.Decks.Remove(deck);
            await _dbContext.SaveChangesAsync();
        }
    }
}
