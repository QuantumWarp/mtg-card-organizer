using AutoMapper;
using MtgCoreLib.Dtos.Cards;
using MtgCoreLib.Dtos.Collections;
using MtgCoreLib.Entities.Cards;
using MtgCoreLib.Entities.Collections;

public class AutoMapperConfig : Profile
{
    // TODO: This is somewhat unmanagable
    public AutoMapperConfig()
    {
        CreateMap<Card,CardDto>();
        CreateMap<CardSetInfo, CardSetInfoDto>();
        CreateMap<CardOtherInfo, CardOtherInfoDto>();

        CreateMap<CardSetInfo, CardDetailsDto>()
            .ForMember(dst => dst.CardId, opt => opt.MapFrom(src => src.Card.Id))
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Card.Name))
            .ForMember(dst => dst.ManaCost, opt => opt.MapFrom(src => src.Card.ManaCost))
            .ForMember(dst => dst.ConvertedManaCost, opt => opt.MapFrom(src => src.Card.ConvertedManaCost))
            .ForMember(dst => dst.Power, opt => opt.MapFrom(src => src.Card.Power))
            .ForMember(dst => dst.Toughness, opt => opt.MapFrom(src => src.Card.Toughness))
            .ForMember(dst => dst.OracleText, opt => opt.MapFrom(src => src.Card.OracleText))
            .ForMember(dst => dst.Type, opt => opt.MapFrom(src => src.Card.Type))

            .ForMember(dst => dst.CardSetInfoId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dst => dst.Num, opt => opt.MapFrom(src => src.Num))
            .ForMember(dst => dst.SetId, opt => opt.MapFrom(src => src.SetId))
            .ForMember(dst => dst.Rarity, opt => opt.MapFrom(src => src.Rarity))
            .ForMember(dst => dst.Artist, opt => opt.MapFrom(src => src.Artist))
            .ForMember(dst => dst.MultiverseId, opt => opt.MapFrom(src => src.MultiverseId));

        CreateMap<CollectionCardLink, CardDetailsDto>()
            .ForMember(dst => dst.CardId, opt => opt.MapFrom(src => src.CardSetInfo.Card.Id))
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.CardSetInfo.Card.Name))
            .ForMember(dst => dst.ManaCost, opt => opt.MapFrom(src => src.CardSetInfo.Card.ManaCost))
            .ForMember(dst => dst.ConvertedManaCost, opt => opt.MapFrom(src => src.CardSetInfo.Card.ConvertedManaCost))
            .ForMember(dst => dst.Power, opt => opt.MapFrom(src => src.CardSetInfo.Card.Power))
            .ForMember(dst => dst.Toughness, opt => opt.MapFrom(src => src.CardSetInfo.Card.Toughness))
            .ForMember(dst => dst.OracleText, opt => opt.MapFrom(src => src.CardSetInfo.Card.OracleText))
            .ForMember(dst => dst.Type, opt => opt.MapFrom(src => src.CardSetInfo.Card.Type))

            .ForMember(dst => dst.CardSetInfoId, opt => opt.MapFrom(src => src.CardSetInfo.Id))
            .ForMember(dst => dst.Num, opt => opt.MapFrom(src => src.CardSetInfo.Num))
            .ForMember(dst => dst.SetId, opt => opt.MapFrom(src => src.CardSetInfo.SetId))
            .ForMember(dst => dst.Rarity, opt => opt.MapFrom(src => src.CardSetInfo.Rarity))
            .ForMember(dst => dst.Artist, opt => opt.MapFrom(src => src.CardSetInfo.Artist))
            .ForMember(dst => dst.MultiverseId, opt => opt.MapFrom(src => src.CardSetInfo.MultiverseId));
            
        CreateMap<CollectionCardLink, CardInstanceDto>()
            .ForMember(dst => dst.CardOtherInfoId, opt => opt.MapFrom(src => src.CardOtherInfo.Id))
            .ForMember(dst => dst.Foil, opt => opt.MapFrom(src => src.CardOtherInfo.Foil))
            .ForMember(dst => dst.Promo, opt => opt.MapFrom(src => src.CardOtherInfo.Promo))

            .ForMember(dst => dst.CardId, opt => opt.MapFrom(src => src.CardSetInfo.Card.Id))
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.CardSetInfo.Card.Name))
            .ForMember(dst => dst.ManaCost, opt => opt.MapFrom(src => src.CardSetInfo.Card.ManaCost))
            .ForMember(dst => dst.ConvertedManaCost, opt => opt.MapFrom(src => src.CardSetInfo.Card.ConvertedManaCost))
            .ForMember(dst => dst.Power, opt => opt.MapFrom(src => src.CardSetInfo.Card.Power))
            .ForMember(dst => dst.Toughness, opt => opt.MapFrom(src => src.CardSetInfo.Card.Toughness))
            .ForMember(dst => dst.OracleText, opt => opt.MapFrom(src => src.CardSetInfo.Card.OracleText))
            .ForMember(dst => dst.Type, opt => opt.MapFrom(src => src.CardSetInfo.Card.Type))

            .ForMember(dst => dst.CardSetInfoId, opt => opt.MapFrom(src => src.CardSetInfo.Id))
            .ForMember(dst => dst.Num, opt => opt.MapFrom(src => src.CardSetInfo.Num))
            .ForMember(dst => dst.SetId, opt => opt.MapFrom(src => src.CardSetInfo.SetId))
            .ForMember(dst => dst.Rarity, opt => opt.MapFrom(src => src.CardSetInfo.Rarity))
            .ForMember(dst => dst.Artist, opt => opt.MapFrom(src => src.CardSetInfo.Artist))
            .ForMember(dst => dst.MultiverseId, opt => opt.MapFrom(src => src.CardSetInfo.MultiverseId));
            
        CreateMap<Set,SetDto>();

        CreateMap<Collection, CollectionDto>();
    }    
}
