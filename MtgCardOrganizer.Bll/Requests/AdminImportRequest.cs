using MtgCardOrganizer.Bll.Parsers;

namespace MtgCardOrganizer.Bll.Requests
{
    public class AdminImportRequest
    {
        public ParseType ParseType { get; set; } = ParseType.MtgJson;
        public string ImportString { get; set; }
    }
}
