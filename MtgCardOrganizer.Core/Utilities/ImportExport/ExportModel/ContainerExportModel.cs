using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Containers;
using Newtonsoft.Json;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
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
            this.Name = container.Name;
        }

        public Container ToContainer(Container parentContainer)
        {
            return new Container {
                Name = this.Name,
                Parent = parentContainer,
            };
        }
    }
}
