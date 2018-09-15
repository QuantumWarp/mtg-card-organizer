using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Dal.Entities.Decks;
using MtgCardOrganizer.Dal.Repositories;
using System.Threading.Tasks;

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
        public async Task<ActionResult<Deck>> Get(int id)
        {
            return await _deckRepository.GetAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Deck deck)
        {
            await _deckRepository.CreateAsync(deck);
            return NoContent();
        }

        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] Deck deck)
        {
            await _deckRepository.UpdateAsync(deck);
            return NoContent();
        }
        
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _deckRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
