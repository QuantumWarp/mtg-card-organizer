using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MtgCoreLib.Dtos.Cards;

namespace MtgCoreLib.Entities.Cards
{
    public class Set : Entity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }

        public ICollection<CardSetInfo> CardSetInfos { get; set; }

        public Set() { }

        public Set(SetDto setDto) {
            Name = setDto.Name;
            Code = setDto.Code;
        }

        public SetDto AsDto() {
            return new SetDto {
                Id = Id,
                Name = Name,
                Code = Code,
            };
        }
    }
}
