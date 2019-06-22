using Microsoft.EntityFrameworkCore;
using MtgCardOrganizer.Dal.Entities.Decks;
using MtgCardOrganizer.Dal.Enums;
using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories.Admin;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Dal.Repositories.Main
{
    public interface IDeckRepository
    {
        Task<Deck> GetAsync(int id);
        Task CreateAsync(Deck deck);
        Task UpdateAsync(Deck deck);
        Task DeleteAsync(int id);
    }

    internal class DeckRepository : IDeckRepository
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IUserService _user;

        public DeckRepository(
            IPermissionRepository permissionRepository,
            IUserService user,
            MtgCardOrganizerContext dbContext)
        {
            _permissionRepository = permissionRepository;
            _user = user;
            _dbContext = dbContext;
        }

        public async Task<Deck> GetAsync(int id)
        {
            var deck = await _dbContext.Decks
                .AsNoTracking()
                .Include(x => x.DeckCards)
                    .ThenInclude(x => x.Card)
                .SingleAsync(x => x.Id == id);

            await _permissionRepository.CheckAsync(deck.ContainerId, Permission.Read);
            return deck;
        }

        public async Task CreateAsync(Deck deck)
        {
            await _permissionRepository.CheckAsync(deck.ContainerId, Permission.Admin);

            await _dbContext.Decks.AddAsync(deck);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Deck deck)
        {
            await _permissionRepository.CheckAsync(deck.ContainerId, Permission.Write);

            foreach (var item in deck.DeckCards)
            {
                item.DeckId = deck.Id;
                item.Card = null;
            }

            _dbContext.UpdateChildren(deck, x => x.DeckCards);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var deck = await _dbContext.Decks.FindAsync(id);
            await _permissionRepository.CheckAsync(deck.ContainerId, Permission.Admin);
            _dbContext.Decks.Remove(deck);
            await _dbContext.SaveChangesAsync();
        }
    }
}
