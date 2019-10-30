namespace MtgCardOrganizer.Dal.Requests.Generic
{
    public class Paging
    {
        public int Offset { get; set; } = 0;
        public int? Limit { get; set; } = null;
    }
}
