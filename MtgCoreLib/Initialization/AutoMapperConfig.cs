using AutoMapper;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Collections;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<Card,CardDto>();
        CreateMap<CardSetInfo, CardSetInfoDto>();
        CreateMap<CardSetInfo,CardDetailsDto>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Card.Name))
            .ForMember(dst => dst.ManaCost, opt => opt.MapFrom(src => src.Card.ManaCost))
            .ForMember(dst => dst.ConvertedManaCost, opt => opt.MapFrom(src => src.Card.ConvertedManaCost))
            .ForMember(dst => dst.Power, opt => opt.MapFrom(src => src.Card.Power))
            .ForMember(dst => dst.Toughness, opt => opt.MapFrom(src => src.Card.Toughness))
            .ForMember(dst => dst.OracleText, opt => opt.MapFrom(src => src.Card.OracleText))
            .ForMember(dst => dst.Type, opt => opt.MapFrom(src => src.Card.Type))
            .ForMember(dst => dst.CardSetInfoId, opt => opt.MapFrom(src => src.Id));
            
        CreateMap<Set,SetDto>();

        CreateMap<Collection, CollectionDto>();
    }    
}
