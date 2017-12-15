using System;
using MtgCoreLib.Entities;

namespace MtgCoreLib.Dtos.Cards
{
    public class SetDto : EntityDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
