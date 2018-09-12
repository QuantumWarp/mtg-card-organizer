using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Core.Entities.Decks;
using MtgCardOrganizer.Core.Repositories;

namespace MtgCardOrganizer.Api.Controllers
{
    [Authorize]
    [Route("api/decks")]
    public class DeckController : Controller
    {
        public IDeckRepository _deckRepository;

        public DeckController(IDeckRepository deckRepository)
        {
            _deckRepository = deckRepository;
        }

        [HttpGet("{id}")]
        public async Task<Deck> Get(int id)
        {
            return await _deckRepository.GetAsync(id);
        }

        [HttpPost]
        public async Task<Deck> Create([FromBody] Deck deck)
        {
            return await _deckRepository.CreateAsync(deck);
        }

        [HttpPatch]
        public async Task<Deck> Update([FromBody] Deck deck)
        {
            return await _deckRepository.UpdateAsync(deck);
        }
        
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _deckRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
