using MtgCoreLib.Entities;
using MtgCoreLib.Utilities.Parsers;

namespace MtgCoreLib.Dtos.Admin
{
    public class ImportCommand
    {
        public ParseType ParseType { get; set; } = ParseType.MtgJson;
        public string ImportString { get; set; }
    }
}
