using System;

namespace MtgCardOrganizer.Api.Areas.Common.Dtos
{
    public class SetDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
