using System.Threading.Tasks;
using MtgCardOrganizer.Core.Initialization;
using MtgCardOrganizer.Core.Utilities.ImportExport;

namespace MtgCardOrganizer.Core.Repositories
{
    public interface IImportExportService
    {
        Task<string> ExportAsync(int containerId);
        Task ImportAsync(int containerId, string importString);
    }

    public class ImportExportService : IImportExportService
    {
        private readonly MtgCardOrganizerContext _dbContext;

        private readonly IContainerRepository _containerRepository;
        private readonly ICollectionRepository _collectionRepository;
        private readonly IDeckRepository _deckRepository;
        private readonly ISetRepository _setRepository;

        public ImportExportService(
            MtgCardOrganizerContext dbContext,
            IContainerRepository containerRepository,
            ICollectionRepository collectionRepository,
            IDeckRepository deckRepository,
            ISetRepository setRepository)
        {
            _dbContext = dbContext;
            _containerRepository = containerRepository;
            _collectionRepository = collectionRepository;
            _deckRepository = deckRepository;
            _setRepository = setRepository;
        }

        public async Task<string> ExportAsync(int containerId)
        {
            var exporter = new Exporter(_containerRepository, _collectionRepository, _deckRepository, _setRepository);
            return await exporter.GetExportStringAsync(containerId);
        }

        public async Task ImportAsync(int containerId, string importString)
        {
            var importer = new Importer(_dbContext);
            await importer.ProcessImportAsync(containerId, importString);
        }
    }
}
