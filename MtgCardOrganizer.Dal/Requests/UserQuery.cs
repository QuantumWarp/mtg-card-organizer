using MtgCardOrganizer.Dal.Requests.Generic;

namespace MtgCardOrganizer.Dal.Requests
{
    public class UserQuery
    {
        public Paging Paging { get; set; }
        public string UserName { get; set; }
    }
}
