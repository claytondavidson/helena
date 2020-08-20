using AutoMapper;
using Domain;

namespace Application.Groups
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Group, GroupDto>()
                .ForMember(d => d.CoverPhoto, o => o.MapFrom(s => s.CoverPhoto.Url));
            CreateMap<GroupMember, MemberDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}