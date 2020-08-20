using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<UserActivity> UserActivities { get; set; }
        public ICollection<GroupMember> GroupMembers { get; set; }
        public ICollection<UserPhoto> UserPhotos { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}