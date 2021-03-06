using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Containers;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class ContainerExportModel
    {
        public string Name { get; set; }

        public List<ContainerExportModel> SubContainers { get; set; } = new List<ContainerExportModel>();
        public List<CollectionExportModel> Collections { get; set; } = new List<CollectionExportModel>();
        public List<DeckExportModel> Decks { get; set; } = new List<DeckExportModel>();

        public ContainerExportModel() { }
        public ContainerExportModel(Container container)
        {
            Name = container.Name;
        }

        public Container ToContainer(Container parentContainer)
        {
            return new Container {
                Name = Name,
                ParentId = parentContainer.Id,
            };
        }
    }
}
