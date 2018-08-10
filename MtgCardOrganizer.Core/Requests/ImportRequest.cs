using MtgCardOrganizer.Core.Entities;
using MtgCardOrganizer.Core.Utilities.Parsers;

namespace MtgCardOrganizer.Core.Requests
{
    public class ImportRequest
    {
        public ParseType ParseType { get; set; } = ParseType.MtgJson;
        public string ImportString { get; set; }
    }
}
