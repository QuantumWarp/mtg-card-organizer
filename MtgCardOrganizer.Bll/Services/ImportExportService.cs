using MtgCardOrganizer.Dal.Initialization;
using MtgCardOrganizer.Dal.Repositories;
using MtgCardOrganizer.Dal.Repositories.Common;
using MtgCardOrganizer.Dal.Repositories.Main;
using MtgCardOrganizer.Dal.Utilities.ImportExport;
using System.Threading.Tasks;

namespace MtgCardOrganizer.Bll.Services
{
    public interface IImportExportService
    {
        Task<string> ExportAsync(int containerId);
        Task ImportAsync(int containerId, string importString);
    }

    internal class ImportExportService : IImportExportService
    {
        private readonly MtgCardOrganizerContext _dbContext;
        private readonly IContainerRepository _containerRepository;
        private readonly ICollectionRepository _collectionRepository;
        private readonly IDeckRepository _deckRepository;
        private readonly ICardSetRepository _cardSetRepository;
        private readonly ISetRepository _setRepository;

        public ImportExportService(
            MtgCardOrganizerContext dbContext,
            IContainerRepository containerRepository,
            ICollectionRepository collectionRepository,
            IDeckRepository deckRepository,
            ICardSetRepository cardSetRepository,
            ISetRepository setRepository)
        {
            _dbContext = dbContext;
            _containerRepository = containerRepository;
            _collectionRepository = collectionRepository;
            _deckRepository = deckRepository;
            _cardSetRepository = cardSetRepository;
            _setRepository = setRepository;
        }

        public async Task<string> ExportAsync(int containerId)
        {
            var exporter = new Exporter(_containerRepository, _collectionRepository, _deckRepository, _setRepository);
            return await exporter.GetExportStringAsync(containerId);
        }

        public async Task ImportAsync(int containerId, string importString)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                var importer = new Importer(_containerRepository, _collectionRepository, _deckRepository, _cardSetRepository, _setRepository);
                await importer.ProcessImportAsync(containerId, importString);
                transaction.Commit();
            }
        }
    }
}
