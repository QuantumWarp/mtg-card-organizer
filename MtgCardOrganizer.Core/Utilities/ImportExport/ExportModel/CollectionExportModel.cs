using System.Collections.Generic;
using MtgCardOrganizer.Core.Entities.Collections;

namespace MtgCardOrganizer.Core.Utilities.ImportExport
{
    public class CollectionExportModel
    {
        public string Name { get; set; }        
        public List<CardInstanceExportModel> Cards { get; set; }

        public CollectionExportModel(Collection collection)
        {
            this.Name = collection.Name;
        }

        public Collection ToCollection()
        {
            return new Collection {
                Name = this.Name,
            };
        }
    }
}
