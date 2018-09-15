using System.Collections.Generic;
using MtgCardOrganizer.Dal.Entities.Collections;
using MtgCardOrganizer.Dal.Entities.Containers;

namespace MtgCardOrganizer.Dal.Utilities.ImportExport
{
    public class CollectionExportModel
    {
        public string Name { get; set; }        
        public List<CardInstanceExportModel> Cards { get; set; }

        public CollectionExportModel() { }
        public CollectionExportModel(Collection collection)
        {
            this.Name = collection.Name;
        }

        public Collection ToCollection(Container container)
        {
            return new Collection {
                Name = this.Name,
                Container = container,
            };
        }
    }
}
