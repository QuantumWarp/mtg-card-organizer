using MtgCardOrganizer.Dal.Entities;
using MtgCardOrganizer.Dal.Utilities.Parsers;

namespace MtgCardOrganizer.Dal.Requests
{
    public class ImportRequest
    {
        public ParseType ParseType { get; set; } = ParseType.MtgJson;
        public string ImportString { get; set; }
    }
}
