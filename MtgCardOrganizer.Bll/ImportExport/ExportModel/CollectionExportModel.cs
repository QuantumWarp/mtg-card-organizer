using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Entities.Containers;
using System.Collections.Generic;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class CollectionExportModel
    {
        public string Name { get; set; }        
        public List<CardInstanceExportModel> Cards { get; set; }

        public CollectionExportModel() { }
        public CollectionExportModel(Collection collection)
        {
            Name = collection.Name;
        }

        public Collection ToCollection(Container container)
        {
            return new Collection {
                Name = Name,
                ContainerId = container.Id,
            };
        }
    }
}
