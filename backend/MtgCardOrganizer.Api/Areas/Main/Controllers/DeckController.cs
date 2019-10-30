using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MtgCardOrganizer.Api.Areas.Main.Dtos;
using MtgCardOrganizer.Dal.Entities.Decks;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Utilities;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Api.Areas.Main.Controllers
{
    [Authorize(Roles = Roles.StandardUser)]
    [Route("api/decks")]
    public class DeckController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IDeckRepository _deckRepository;

        public DeckController(
            IMapper mapper,
            IDeckRepository deckRepository)
        {
            _mapper = mapper;
            _deckRepository = deckRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeckDto>> Get(int id)
        {
            var deck = await _deckRepository.GetAsync(id);
            return _mapper.Map<DeckDto>(deck);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DeckDto deckDto)
        {
            var deck = _mapper.Map<Deck>(deckDto);
            await _deckRepository.CreateAsync(deck);
            return NoContent();
        }

        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] DeckDto deckDto)
        {
            var deck = _mapper.Map<Deck>(deckDto);
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
